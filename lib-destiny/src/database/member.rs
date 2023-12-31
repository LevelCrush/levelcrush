use levelcrush::alias::destiny::MembershipId;
use levelcrush::alias::RecordId;
use levelcrush::macros::{DatabaseRecord, DatabaseResult};
use levelcrush::util::unix_timestamp;
use levelcrush::{bigdecimal::ToPrimitive, BigDecimal};
use levelcrush::{database, project_str};
use sqlx::{sqlite::SqliteRow, Row, SqlitePool};

#[DatabaseRecord]
pub struct MemberRecord {
    pub membership_id: MembershipId,
    pub platform: i64,
    pub display_name: String,
    pub display_name_global: String,
    pub guardian_rank_current: i64,
    pub guardian_rank_lifetime: i64,
    pub last_played_at: i64,
}

#[DatabaseResult]
pub struct MembershipReadyCheckResult {
    pub membership_id: MembershipId,
    pub updated_at: i64,
}

#[DatabaseResult]
pub struct MemberResult {
    pub membership_id: MembershipId,
    pub platform: i64,
    pub last_played_at: i64,
    pub display_name: String,
    pub display_name_global: String,
    pub clan_group_id: i64,
    pub clan_name: String,
    pub clan_call_sign: String,
    pub clan_joined_at: i64,
    pub clan_group_role: i64,
    pub clan_is_network: i64,
    pub updated_at: i64,
}

#[DatabaseRecord]
pub struct MemberSnapshotRecord {
    pub membership_id: MembershipId,
    pub snapshot_name: String,
    pub version: i64,
    pub data: String,
}

pub async fn get_snapshot(
    membership_id: MembershipId,
    snapshot: &str,
    version: i64,
    pool: &SqlitePool,
) -> Option<MemberSnapshotRecord> {
    let query = sqlx::query_file_as!(
        MemberSnapshotRecord,
        "queries/member_snapshot_get.sql",
        membership_id,
        snapshot,
        version,
    )
    .fetch_optional(pool)
    .await;

    if let Ok(query) = query {
        query
    } else {
        database::log_error(query);
        None
    }
}

pub async fn write_snapshot(
    membership_id: MembershipId,
    snapshot: &str,
    version: i64,
    data: String,
    pool: &SqlitePool,
) {
    let timestamp = unix_timestamp();
    let query = sqlx::query_file!(
        "queries/member_snapshot_write.sql",
        membership_id,
        snapshot,
        version,
        data,
        timestamp,
        0,
        0,
    );

    let result = query.execute(pool).await;
    database::log_error(result);
}

/// similiar to the status function, except it searches by bungie name instead
/// NOTE: If in the instance that a user has an inactive linked account (not primary) and it finds it way into our system
/// we will only return the member record that has been most recently played
pub async fn get_by_bungie_name(bungie_name: &str, pool: &SqlitePool) -> Option<MemberResult> {
    let query = sqlx::query_file_as!(MemberResult, "queries/member_get_by_bungie.sql", bungie_name)
        .fetch_optional(pool)
        .await;

    if let Ok(record) = query {
        record
    } else {
        database::log_error(query);
        None
    }
}

pub async fn get(membership_id: i64, pool: &SqlitePool) -> Option<MemberResult> {
    let query = sqlx::query_file_as!(MemberResult, "queries/member_get.sql", membership_id)
        .fetch_optional(pool)
        .await;

    if let Ok(record) = query {
        record
    } else {
        database::log_error(query);
        None
    }
}

pub async fn multi_get(membership_ids: &[i64], pool: &SqlitePool) -> Vec<MemberResult> {
    if membership_ids.is_empty() {
        return Vec::new();
    }

    let prepared_pos = vec!["?"; membership_ids.len()].join(",");

    let statement = project_str!("queries/member_multi_get.sql", prepared_pos);
    let mut query_builder = sqlx::query_as::<_, MemberResult>(&statement);
    for membership_id in membership_ids.iter() {
        query_builder = query_builder.bind(membership_id);
    }

    let query = query_builder.fetch_all(pool).await;

    if let Ok(records) = query {
        // there has to be a better then forcing a map on sqlx like this when types mismatch
        // try_from is not **currently** working for me, maybe I'm doing something wrong
        // for now this works
        records
    } else {
        database::log_error(query);
        Vec::new()
    }
}

/// fetches a member record from the database with only the membership_id
pub async fn get_record(membership_id: i64, pool: &SqlitePool) -> Option<MemberRecord> {
    let query = sqlx::query_file_as!(MemberRecord, "queries/member_record_get.sql", membership_id)
        .fetch_optional(pool)
        .await;

    if let Ok(query) = query {
        query
    } else {
        database::log_error(query);
        None
    }
}

/// update membership record
pub async fn update(member: &MemberRecord, database: &SqlitePool) -> bool {
    // record found, update it!
    let query = sqlx::query_file!(
        "queries/member_record_update.sql",
        member.platform,
        member.display_name,
        member.display_name_global,
        member.guardian_rank_current,
        member.guardian_rank_lifetime,
        member.last_played_at,
        member.updated_at,
        member.id
    )
    .execute(database)
    .await;

    if query.is_ok() {
        true
    } else {
        database::log_error(query);
        false
    }
}

pub async fn create(member: MemberRecord, database: &SqlitePool) -> RecordId {
    let query = sqlx::query_file!(
        "queries/member_record_insert.sql",
        member.platform,
        member.membership_id,
        member.display_name,
        member.display_name_global,
        member.guardian_rank_current,
        member.guardian_rank_lifetime,
        member.last_played_at,
        member.created_at
    )
    .execute(database)
    .await;

    if let Ok(query) = query {
        query.last_insert_rowid() as RecordId
    } else {
        database::log_error(query);
        -1
    }
}

pub async fn search_count<T: Into<String>>(display_name: T, pool: &SqlitePool) -> u32 {
    let normal_name = display_name.into();
    let escaped = normal_name.replace('%', "\\%").replace('_', "\\_");
    let wildcard_search = format!("%{}%", escaped);

    let query = sqlx::query_file!("queries/member_search_count.sql", wildcard_search, wildcard_search)
        .fetch_optional(pool)
        .await;

    if let Ok(Some(query)) = query {
        query.total as u32
    } else {
        database::log_error(query);
        0
    }
}

pub async fn search<T: Into<String>>(display_name: T, offset: u32, limit: u32, pool: &SqlitePool) -> Vec<MemberResult> {
    let normal_name = display_name.into();
    let escaped = normal_name.replace('%', "\\%").replace('_', "\\_");
    let wildcard_search = format!("%{}%", escaped);
    let query = sqlx::query_file_as!(
        MemberResult,
        "queries/member_search.sql",
        wildcard_search,
        wildcard_search,
        offset,
        limit
    )
    .fetch_all(pool)
    .await;

    if let Ok(query) = query {
        query
    } else {
        database::log_error(query);
        Vec::new()
    }
}
