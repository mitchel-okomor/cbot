export enum GENDER_TYPE {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum DISCOUNT_TYPE {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

export enum SORT_ORDER {
  ASC = "ASC",
  DESC = "DESC",
}

export enum GENERIC_RESPONSE_STATUS {
  SUCCESS = "00",
  FAILED = "99",
  PENDING = "03",
  NOT_FOUND = "04",
  ERROR = "95",
  INVALID = "97",
  CONFLICT = "94",
}

export enum ROLE {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  EMPLOYEE = "employee",
}

export enum EXCHANGE_PROVIDER {
  BINANCE = "binance",
  BYBIT = "bybit",
  KUCOIN = "kucoin",
  OKX = "okx",
  COINBASE = "coinbase",
  GATE_IO = "gate_io",
  HUOBI = "huobi",
  KRAKEN = "kraken",
  BINGX = "bingx",
  BITGET = "bitget",
  MEXC = "mexc",
}

export enum ORDER_SIDE {
  BUY = "BUY",
  SELL = "SELL",
}

export enum ORDER_TYPE {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
  STOP_LOSS = "STOP_LOSS",
  STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
  TAKE_PROFIT = "TAKE_PROFIT",
  TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
  TRAILING_STOP = "TRAILING_STOP",
}

export enum ORDER_STATUS {
  PENDING = "pending",
  OPEN = "open",
  FILLED = "filled",
  PARTIALLY_FILLED = "partially_filled",
  CANCELLED = "cancelled",
  REJECTED = "rejected",
  EXPIRED = "expired",
}

export enum TRADE_STATUS {
  ACTIVE = "active",
  CLOSED = "closed",
  CANCELLED = "cancelled",
  PENDING = "pending",
  PAUSED = "paused",
}

export enum EXIT_REASON {
  TAKE_PROFIT = "take_profit",
  STOP_LOSS = "stop_loss",
  TRAILING_STOP = "trailing_stop",
  TIME_LIMIT = "time_limit",
  MANUAL = "manual",
  DCA_FAILED = "dca_failed",
  EXCHANGE_ERROR = "exchange_error",
  CONFIG_CHANGED = "config_changed",
  BEAR_MARKET = "bear_market",
  LIQUIDITY_ISSUE = "liquidity_issue",
}

export enum CONVICTION_LEVEL {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum NOTIFICATION_EVENT {
  // Trading Events
  TRADE_ENTRY = "trade_entry",
  TRADE_EXIT = "trade_exit",
  TRADE_CLOSED = "trade_closed",
  DCA_EXECUTED = "dca_executed",
  STOP_LOSS_TRIGGERED = "stop_loss_triggered",
  TAKE_PROFIT_TRIGGERED = "take_profit_triggered",
  TRAILING_STOP_TRIGGERED = "trailing_stop_triggered",

  // Price Events
  PRICE_DROP = "price_drop",
  PRICE_ALERT = "price_alert",
  WATCHLIST_TRIGGER = "watchlist_trigger",

  // Account Events
  BALANCE_UPDATE = "balance_update",
  ACCOUNT_LOCKED = "account_locked",
  API_KEY_EXPIRING = "api_key_expiring",

  // System Events
  DAILY_SUMMARY = "daily_summary",
  WEEKLY_REPORT = "weekly_report",
  MONTHLY_REPORT = "monthly_report",

  // Error Events
  TRADE_ERROR = "trade_error",
  EXCHANGE_ERROR = "exchange_error",
  DCA_ERROR = "dca_error",
}

export enum NOTIFICATION_SEVERITY {
  INFO = "info",
  WARNING = "warning",
  CRITICAL = "critical",
  SUCCESS = "success",
}

export enum ALERT_TYPE {
  PRICE_DROP = "price_drop",
  PRICE_SURGE = "price_surge",
  DCA_LEVEL = "dca_level",
  STOP_LOSS = "stop_loss",
  TAKE_PROFIT = "take_profit",
  WATCHLIST = "watchlist",
  WATCHLIST_TRIGGER = "watchlist_trigger",
  TRADE_ENTRY = "trade_entry",
  TRADE_EXIT = "trade_exit",
  SYSTEM_ERROR = "system_error",
  MAINTENANCE = "maintenance",
}

export enum ALERT_SEVERITY {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  CRITICAL = "critical",
}

export enum WATCHLIST_STATUS {
  PENDING = "pending",
  TRIGGERED = "triggered",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum BACKTEST_STATUS {
  QUEUED = "queued",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum BACKTEST_INTERVAL {
  ONE_MINUTE = "1m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  FOUR_HOURS = "4h",
  ONE_DAY = "1d",
  ONE_WEEK = "1w",
}

export enum SYMBOL_STATUS {
  TRADING = "trading",
  HALTED = "halted",
  DELISTED = "delisted",
  PENDING = "pending",
}

export enum MARKET_TYPE {
  SPOT = "spot",
  FUTURES = "futures",
  OPTIONS = "options",
  PERPETUAL = "perpetual",
}

export enum TIMEFRAME {
  ONE_MINUTE = "1m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  TWO_HOURS = "2h",
  FOUR_HOURS = "4h",
  SIX_HOURS = "6h",
  EIGHT_HOURS = "8h",
  TWELVE_HOURS = "12h",
  ONE_DAY = "1d",
  THREE_DAYS = "3d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M",
}

export enum METRIC_TYPE {
  WIN_RATE = "win_rate",
  PROFIT_FACTOR = "profit_factor",
  SHARPE_RATIO = "sharpe_ratio",
  MAX_DRAWDOWN = "max_drawdown",
  AVG_PROFIT = "avg_profit",
  AVG_LOSS = "avg_loss",
  TOTAL_PROFIT = "total_profit",
  TOTAL_TRADES = "total_trades",
  BEST_TRADE = "best_trade",
  WORST_TRADE = "worst_trade",
}

export enum RISK_LEVEL {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  EXTREME = "extreme",
}

export enum PORTFOLIO_STATUS {
  SAFE = "safe",
  MODERATE = "moderate",
  AGGRESSIVE = "aggressive",
  EXTREME = "extreme",
  LIQUIDATED = "liquidated",
}

export enum ERROR_CODE {
  // Auth Errors
  AUTH_INVALID_CREDENTIALS = "AUTH_001",
  AUTH_TOKEN_EXPIRED = "AUTH_002",
  AUTH_INVALID_TOKEN = "AUTH_003",
  AUTH_ACCOUNT_LOCKED = "AUTH_004",
  AUTH_EMAIL_NOT_VERIFIED = "AUTH_005",

  // Exchange Errors
  EXCHANGE_API_KEY_INVALID = "EXCH_001",
  EXCHANGE_API_KEY_EXPIRED = "EXCH_002",
  EXCHANGE_RATE_LIMIT = "EXCH_003",
  EXCHANGE_INSUFFICIENT_BALANCE = "EXCH_004",
  EXCHANGE_SYMBOL_NOT_FOUND = "EXCH_005",

  // Trading Errors
  TRADE_INSUFFICIENT_BALANCE = "TRADE_001",
  TRADE_INVALID_SYMBOL = "TRADE_002",
  TRADE_MAX_POSITION = "TRADE_003",
  TRADE_SLIPPAGE_EXCEEDED = "TRADE_004",
  TRADE_STOP_LOSS_TRIGGERED = "TRADE_005",

  // System Errors
  SYSTEM_DATABASE_ERROR = "SYS_001",
  SYSTEM_REDIS_ERROR = "SYS_002",
  SYSTEM_CONFIG_ERROR = "SYS_003",
  SYSTEM_DEPLOYMENT_ERROR = "SYS_004",
}

export enum LOG_LEVEL {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

export enum LOG_TYPE {
  SYSTEM = "system",
  TRADE = "trade",
  EXCHANGE = "exchange",
  AUTH = "auth",
  NOTIFICATION = "notification",
  BACKTEST = "backtest",
  USER_ACTION = "user_action",
  ERROR = "error",
}

export enum CONFIG_KEY {
  TRADING_CONFIG = "trading_config",
  USER_PREFERENCES = "user_preferences",
  EXCHANGE_CONFIG = "exchange_config",
  NOTIFICATION_CONFIG = "notification_config",
  RISK_CONFIG = "risk_config",
  BACKTEST_CONFIG = "backtest_config",
  SYSTEM_CONFIG = "system_config",
}

export enum WS_EVENT {
  // Connection
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  RECONNECT = "reconnect",

  // Trading
  TRADE_UPDATE = "trade_update",
  PRICE_UPDATE = "price_update",
  ORDER_UPDATE = "order_update",
  BALANCE_UPDATE = "balance_update",

  // User
  USER_NOTIFICATION = "user_notification",
  USER_ALERT = "user_alert",
  USER_SETTINGS_UPDATE = "user_settings_update",

  // System
  SYSTEM_STATUS = "system_status",
  MAINTENANCE_ALERT = "maintenance_alert",
}

export enum QUESTION_TYPE {
  SINGLE_OPTION = "SINGLE_OPTION",
  MULTIPLE_OPTIONS = "MULTIPLE_OPTIONS",
  TEXT_INPUT = "TEXT_INPUT",
}

export enum APPLICATION_STATUS {
  PENDING = "PENDING",
  PAID = "PAID",
  REJECTED = "REJECTED",
}

export enum RESPONSE_CATEGORY {
  EXPERIENCE = "EXPERIENCE",
  CURRENT_ROLE = "CURRENT_ROLE",
  TRACK_SELECTION = "TRACK_SELECTION",
  MOTIVATION = "MOTIVATION",
  CHALLENGE = "CHALLENGE",
  GOALS = "GOALS",
  COMMITMENT = "COMMITMENT",
}

export enum NOTIFICATION_TYPE {
  IN_APP = "IN_APP",
  PUSH = "PUSH",
  EMAIL = "EMAIL",
  TELEGRAM = "TELEGRAM",
}

export enum FEEDBACK_CATEGORY {
  ANALYTICS = "ANALYTICS",
  PRODUCTS = "PRODUCTS",
  NOTIFICATION = "NOTIFICATION",
}

export enum SORT_BY {
  CREATEDAT = "createdAt",
  UPDATEDAT = "updatedAt",
  CURRENCY = "currency",
  AMOUNT = "amount",
  STATUS = "status",
  TYPE = "type",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  NAME = "name",
  TITLE = "title",
  DUE_DATE = "dueDate",
  TEAM = "team",
}

export enum SERVICE_GROUP {
  EMAIL = "EMAIL",
  PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
  SMS = "SMS",
  WHATSAPP = "WHATSAPP",
  MAIL_LIST = "MAIL_LIST",
  STORAGE = "STORAGE",
}

export enum PROVIDERS {
  NODEMAILER = "NODEMAILER",
  TWILIO = "TWILIO",
  ONE_SIGNAL = "ONE_SIGNAL",
  CLOUDINARY = "CLOUDINARY",
  AWS = "AWS",
}

export enum EMAIL_NOTIFICATION_EVENTS {
  OTP_EMAIL = "signup.otp",
  FORGOT_PASSWORD_EMAIL = "forgot.password",
  NEW_ADMIN_EMAIL = "new.admin.email",
  APPLICATION_CONFIRMATION_EMAIL = "application.confirmation",
  PAYMENT_CONFIRMATION_EMAIL = "payment.confirmation",

  // trade

  TRADE_ENTRY = "trade.entry",
  DCA_EXECUTED = "dca.executed",
  TRADE_EXIT = "trade.exit",
}

export enum TRANSACTION_EVENTS {
  TRANSACTION_COMPLETED = "transaction.completed",
}

export enum PAYMENT_MODE {
  PAYMENT = "payment",
  SETUP = "setup",
  SUBSCRIPTION = "subscription",
}

export enum YEARS_OF_EXPERIENCE {
  LESS_THAN_1_YEAR = "less_than_1_year",
  BETWEEN_1_AND_2_YEARS = "between_1_and_2_years",
  BETWEEN_3_AND_4_YEARS = "between_3_and_4_years",
  FIVE_OR_MORE_YEARS = "five_or_more_years",
}

export enum TYPE_OF_ORGANIZATION {
  STARTUP = "startup",
  MEDIUM_SIZE_COMPANY = "medium_size_company",
  ENTERPRISE = "enterprise",
  FREELANCER = "freelancer",
  UNEMPLOYED = "unemployed",
}

export enum PUSH_NOTIFICATION_EVENTS {}

export enum SOCKET_NOTIFICATION_EVENTS {}
