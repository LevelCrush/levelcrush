use levelcrush::{cache::MemoryCache, database, retry_lock::RetryLock, types::UnixTimestamp, uuid::Uuid};
use sqlx::MySqlPool;

#[derive(Clone, Debug)]
pub struct AppState {
    pub database: MySqlPool,
    pub http_client: reqwest::Client,
    pub guard: RetryLock,
}

impl AppState {
    /// Construct an app state
    ///
    /// Note: This will create a new database pool as well as a new bungie client
    pub async fn new() -> AppState {
        let database = database::connect().await;
        let http_client = reqwest::ClientBuilder::new()
            .build()
            .expect("Failed to initialize TLS or get system configuration");

        AppState {
            database,
            http_client,
            guard: RetryLock::default(),
        }
    }
}
