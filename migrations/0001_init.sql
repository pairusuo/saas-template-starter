-- Cloudflare D1 initial schema
-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  github_id TEXT UNIQUE,
  email TEXT,
  name TEXT,
  avatar TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- OAuth accounts (optional, to store provider linkage and limited tokens)
CREATE TABLE IF NOT EXISTS accounts (
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  access_token_enc TEXT,
  token_scope TEXT,
  expires_at INTEGER,
  PRIMARY KEY (provider, provider_account_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_accounts_user ON accounts(user_id);

-- Entitlements (feature grants)
CREATE TABLE IF NOT EXISTS entitlements (
  user_id TEXT NOT NULL,
  feature_key TEXT NOT NULL,
  source TEXT,
  granted_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, feature_key),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Purchases (one-time payments)
CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_checkout_session_id TEXT UNIQUE,
  amount INTEGER,
  currency TEXT,
  status TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT,
  slug TEXT,
  layout_json TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_user_slug ON projects(user_id, slug);

-- Exports history
CREATE TABLE IF NOT EXISTS exports (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  target TEXT NOT NULL, -- 'zip' | 'github'
  status TEXT NOT NULL, -- 'pending' | 'running' | 'success' | 'failed'
  repo_full_name TEXT,
  download_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
CREATE INDEX IF NOT EXISTS idx_exports_project ON exports(project_id);

