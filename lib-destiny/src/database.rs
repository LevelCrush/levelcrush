pub mod activity;
pub mod activity_history;
pub mod activity_stats;
pub mod activity_types;
pub mod character;
pub mod clan;
pub mod class;
pub mod instance;
pub mod leaderboard;
pub mod member;
pub mod rank;
pub mod seasons;
pub mod setting;
pub mod triumph;

pub const DATABASE_URL: &str = "sqlite://destiny.sqlite?mode=rwc";
