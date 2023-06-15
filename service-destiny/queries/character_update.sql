UPDATE member_characters
SET
    member_characters.membership_id = ?,
    member_characters.platform = ?,
    member_characters.character_id = ?,
    member_characters.class_hash = ?,
    member_characters.light = ?,
    member_characters.last_played_at = ?,
    member_characters.minutes_played_session = ?,
    member_characters.minutes_played_lifetime = ?,
    member_characters.emblem_hash = ?,
    member_characters.emblem_url = ?,
    member_characters.emblem_background_url = ?,
    member_characters.updated_at = ?,
    member_characters.deleted_at = ?
WHERE member_characters.id = ?