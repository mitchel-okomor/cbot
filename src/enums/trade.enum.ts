export enum TRADE_EVENTS {
  // ============ TRADE LIFECYCLE EVENTS ============

  /**
   * Emitted when a new trade is entered
   * Payload: { user, trade, coinData, config }
   */
  TRADE_ENTERED = "trade.entered",

  /**
   * Emitted when a trade is being evaluated for entry
   * Payload: { user, symbol, price, dropPercentage, volume }
   */
  TRADE_EVALUATING = "trade.evaluating",

  /**
   * Emitted when a trade is successfully executed
   * Payload: { user, trade, order, executionPrice }
   */
  TRADE_EXECUTED = "trade.executed",

  /**
   * Emitted when a trade is closed/exited
   * Payload: { user, trade, profit, profitAmount, reason }
   */
  TRADE_EXITED = "trade.exited",

  /**
   * Emitted when a trade is closed successfully
   * Payload: { user, trade, exitPrice, profit }
   */
  TRADE_CLOSED = "trade.closed",

  /**
   * Emitted when a trade is cancelled manually
   * Payload: { user, trade, reason }
   */
  TRADE_CANCELLED = "trade.cancelled",

  /**
   * Emitted when a trade is paused temporarily
   * Payload: { user, trade, reason }
   */
  TRADE_PAUSED = "trade.paused",

  /**
   * Emitted when a trade is resumed after pause
   * Payload: { user, trade }
   */
  TRADE_RESUMED = "trade.resumed",

  /**
   * Emitted when a trade fails to execute
   * Payload: { user, trade, error, reason }
   */
  TRADE_FAILED = "trade.failed",

  // ============ DCA EVENTS ============

  /**
   * Emitted when DCA is about to be executed
   * Payload: { user, trade, currentPrice, dcaLevel, amount }
   */
  DCA_EXECUTING = "dca.executing",

  /**
   * Emitted when DCA is successfully executed
   * Payload: { user, trade, amount, price, level, newAverage }
   */
  DCA_EXECUTED = "dca.executed",

  /**
   * Emitted when DCA fails
   * Payload: { user, trade, error, dcaLevel }
   */
  DCA_FAILED = "dca.failed",

  /**
   * Emitted when DCA level is skipped (manual override)
   * Payload: { user, trade, level, reason }
   */
  DCA_SKIPPED = "dca.skipped",

  /**
   * Emitted when DCA limit is reached (max levels)
   * Payload: { user, trade, maxLevels }
   */
  DCA_LIMIT_REACHED = "dca.limit_reached",

  /**
   * Emitted when DCA is manually triggered by user
   * Payload: { user, trade, amount, price }
   */
  DCA_MANUAL = "dca.manual",

  // ============ PRICE EVENTS ============

  /**
   * Emitted when price drops significantly
   * Payload: { user, trade, currentPrice, dropPercentage }
   */
  PRICE_DROPPED = "price.dropped",

  /**
   * Emitted when price surges/pumps
   * Payload: { user, trade, currentPrice, surgePercentage }
   */
  PRICE_SURGED = "price.surged",

  /**
   * Emitted on every price update (for real-time monitoring)
   * Payload: { user, trade, oldPrice, newPrice, change }
   */
  PRICE_UPDATED = "price.updated",

  /**
   * Emitted when price breaks support level
   * Payload: { user, trade, currentPrice, supportLevel }
   */
  PRICE_BROKE_SUPPORT = "price.broke_support",

  /**
   * Emitted when price breaks resistance level
   * Payload: { user, trade, currentPrice, resistanceLevel }
   */
  PRICE_BROKE_RESISTANCE = "price.broke_resistance",

  // ============ EXIT EVENTS ============

  /**
   * Emitted when take profit is triggered
   * Payload: { user, trade, profit, profitAmount, target }
   */
  TAKE_PROFIT_TRIGGERED = "take_profit.triggered",

  /**
   * Emitted when stop loss is triggered
   * Payload: { user, trade, loss, lossAmount, stopPrice }
   */
  STOP_LOSS_TRIGGERED = "stop_loss.triggered",

  /**
   * Emitted when trailing stop is triggered
   * Payload: { user, trade, highestPrice, currentPrice, trailPercentage }
   */
  TRAILING_STOP_TRIGGERED = "trailing_stop.triggered",

  /**
   * Emitted when time limit is reached
   * Payload: { user, trade, daysHeld, maxDays }
   */
  TIME_LIMIT_REACHED = "time_limit.reached",

  /**
   * Emitted when trade is force-closed
   * Payload: { user, trade, reason }
   */
  FORCE_CLOSED = "trade.force_closed",

  // ============ POSITION EVENTS ============

  /**
   * Emitted when position size is updated
   * Payload: { user, trade, oldSize, newSize }
   */
  POSITION_UPDATED = "position.updated",

  /**
   * Emitted when position size exceeds limit
   * Payload: { user, trade, currentSize, maxSize }
   */
  POSITION_LIMIT_EXCEEDED = "position.limit_exceeded",

  /**
   * Emitted when position is reduced (partial exit)
   * Payload: { user, trade, amountReduced, remainingAmount }
   */
  POSITION_REDUCED = "position.reduced",

  // ============ PORTFOLIO EVENTS ============

  /**
   * Emitted when portfolio is rebalanced
   * Payload: { user, trades, newAllocation }
   */
  PORTFOLIO_REBALANCED = "portfolio.rebalanced",

  /**
   * Emitted when portfolio risk level changes
   * Payload: { user, oldRisk, newRisk }
   */
  PORTFOLIO_RISK_CHANGED = "portfolio.risk_changed",

  /**
   * Emitted when max trades limit is reached
   * Payload: { user, currentTrades, maxTrades }
   */
  MAX_TRADES_REACHED = "portfolio.max_trades_reached",

  /**
   * Emitted when capital limit is reached
   * Payload: { user, usedCapital, maxCapital }
   */
  CAPITAL_LIMIT_REACHED = "portfolio.capital_limit_reached",

  // ============ EXCHANGE EVENTS ============

  /**
   * Emitted when exchange connection is lost
   * Payload: { user, exchange, error }
   */
  EXCHANGE_DISCONNECTED = "exchange.disconnected",

  /**
   * Emitted when exchange connection is restored
   * Payload: { user, exchange }
   */
  EXCHANGE_RECONNECTED = "exchange.reconnected",

  /**
   * Emitted when exchange API key expires
   * Payload: { user, exchange, apiKey }
   */
  EXCHANGE_API_KEY_EXPIRED = "exchange.api_key_expired",

  /**
   * Emitted when exchange rate limit is hit
   * Payload: { user, exchange, limit, window }
   */
  EXCHANGE_RATE_LIMITED = "exchange.rate_limited",

  /**
   * Emitted when exchange returns an error
   * Payload: { user, exchange, error, endpoint }
   */
  EXCHANGE_ERROR = "exchange.error",

  // ============ CONFIGURATION EVENTS ============

  /**
   * Emitted when trading configuration is updated
   * Payload: { user, oldConfig, newConfig }
   */
  CONFIG_UPDATED = "config.updated",

  /**
   * Emitted when strategy is changed
   * Payload: { user, oldStrategy, newStrategy }
   */
  STRATEGY_CHANGED = "strategy.changed",

  /**
   * Emitted when stop loss is updated
   * Payload: { user, trade, oldStopLoss, newStopLoss }
   */
  STOP_LOSS_UPDATED = "stop_loss.updated",

  /**
   * Emitted when take profit is updated
   * Payload: { user, trade, oldTarget, newTarget }
   */
  TAKE_PROFIT_UPDATED = "take_profit.updated",

  // ============ WATCHLIST EVENTS ============

  /**
   * Emitted when watchlist item triggers
   * Payload: { user, symbol, price, dropPercentage }
   */
  WATCHLIST_TRIGGERED = "watchlist.triggered",

  /**
   * Emitted when watchlist item is added
   * Payload: { user, symbol, threshold }
   */
  WATCHLIST_ADDED = "watchlist.added",

  /**
   * Emitted when watchlist item is removed
   * Payload: { user, symbol }
   */
  WATCHLIST_REMOVED = "watchlist.removed",

  // ============ NOTIFICATION EVENTS ============

  /**
   * Emitted when trade-related notification is sent
   * Payload: { user, type, message, data }
   */
  NOTIFICATION_SENT = "notification.sent",

  /**
   * Emitted when notification fails to send
   * Payload: { user, type, error, channel }
   */
  NOTIFICATION_FAILED = "notification.failed",

  // ============ ALERT EVENTS ============

  /**
   * Emitted when a new alert is created
   * Payload: { user, alert, severity }
   */
  ALERT_CREATED = "alert.created",

  /**
   * Emitted when alert is resolved
   * Payload: { user, alert, resolution }
   */
  ALERT_RESOLVED = "alert.resolved",

  // ============ SYSTEM EVENTS ============

  /**
   * Emitted when system status changes
   * Payload: { status, message, timestamp }
   */
  SYSTEM_STATUS_CHANGED = "system.status_changed",

  /**
   * Emitted when system enters maintenance mode
   * Payload: { reason, duration }
   */
  MAINTENANCE_STARTED = "system.maintenance_started",

  /**
   * Emitted when system exits maintenance mode
   * Payload: { duration, completed }
   */
  MAINTENANCE_ENDED = "system.maintenance_ended",

  /**
   * Emitted when system error occurs
   * Payload: { error, stack, context }
   */
  SYSTEM_ERROR = "system.error",

  // ============ CUSTOM EVENTS ============

  /**
   * Emitted for custom user-defined events
   * Payload: { user, customData, metadata }
   */
  CUSTOM = "custom",

  /**
   * Emitted for testing/debugging purposes
   * Payload: { testData, user }
   */
  TEST = "test",
}
