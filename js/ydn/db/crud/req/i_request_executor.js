/**
 * @fileoverview Execute data request.
 *
 * Before invoking database request, transaction object (tx) must set
 * and active. Caller must preform setting tx. This class will not check
 * it, but run immediately. Basically thinks this as a static object.
 */


goog.provide('ydn.db.crud.req.IRequestExecutor');


/**
 * @interface
 */
ydn.db.crud.req.IRequestExecutor = function() {};


/**
 * Execute PUT request either storing result to tx or callback to df.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no tx number.
 * @param {?function(*, boolean=)} df deferred to feed result.
 * @param {string} table table name.
 * @param {!Object} value object to put.
 * @param {(!Array|string|number)=} opt_key optional out-of-line key.
 */
ydn.db.crud.req.IRequestExecutor.prototype.addObject = goog.abstractMethod;

/**
 * Add objects and return list of key inserted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return keys in deferred function.
 * @param {string} store_name store name.
 * @param {!Array.<!Object>} objs object to put.
 * @param {!Array.<IDBKey>=} opt_key optional out-of-line keys.
 */
ydn.db.crud.req.IRequestExecutor.prototype.addObjects = goog.abstractMethod;

/**
 * Delete given key in the object store.
 * Return number of keys deleted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {(IDBKey)} id object key to be deleted.
 */
ydn.db.crud.req.IRequestExecutor.prototype.removeById = goog.abstractMethod;


/**
 * Delete given key in the object store.
 * Return number of keys deleted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no transaction number.
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {(!Array.<!ydn.db.Key>)} id object key to be deleted.
 */
ydn.db.crud.req.IRequestExecutor.prototype.removeByKeys =
    goog.abstractMethod;


/**
 * Clear records in the given key range from a store.
 * Return number of keys deleted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no transaction number.
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {IDBKeyRange} key range.
 */
ydn.db.crud.req.IRequestExecutor.prototype.removeByKeyRange =
    goog.abstractMethod;


/**
 * Clear records in the given key range from a store.
 * Return number of keys deleted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number.
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {IDBKeyRange} key range.
 */
ydn.db.crud.req.IRequestExecutor.prototype.clearByKeyRange =
    goog.abstractMethod;


/**
 * Clear records in the given key range from a store.
 * Return number of keys deleted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {string} index name.
 * @param {IDBKeyRange} key range.
 */
ydn.db.crud.req.IRequestExecutor.prototype.removeByIndexKeyRange = goog.abstractMethod;


/**
 * Clear a store or stores.
 * Return number of stores deleted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {(!Array.<string>)=} store table name.
 */
ydn.db.crud.req.IRequestExecutor.prototype.clearByStores = goog.abstractMethod;


/**
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df return a deferred function.
 * @param {!Array.<string>} table store name.
 */
ydn.db.crud.req.IRequestExecutor.prototype.countStores = goog.abstractMethod;


/**
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df return a deferred function.
 * @param {string} table store name.
 * @param {IDBKeyRange} keyRange the key range.
 * @param {(string|undefined)} index name.
 * @param {boolean} unique count unique index key.
 */
ydn.db.crud.req.IRequestExecutor.prototype.countKeyRange = goog.abstractMethod;


/**
 * Return object
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {!IDBKey} id object key to be retrieved, if not
 * provided,
 * all entries in the store will return.
 */
ydn.db.crud.req.IRequestExecutor.prototype.getById = goog.abstractMethod;


/**
 * Retrieve primary keys from a store in a given key range.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {IDBKeyRange} key_range to retrieve.
 * @param {boolean} reverse ordering.
 * @param {number} limit the results.
 * @param {number} offset skip first results.
 */
ydn.db.crud.req.IRequestExecutor.prototype.keysByKeyRange =
  goog.abstractMethod;


/**
 * Retrieve primary keys from a store in a given index key range.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store table name.
 * @param {string} index name.
 * @param {IDBKeyRange} key_range to retrieve.
 * @param {boolean} reverse ordering.
 * @param {number} limit the results.
 * @param {number} offset skip first results.
 * @param {boolean} unique unique key.
 */
ydn.db.crud.req.IRequestExecutor.prototype.keysByIndexKeyRange =
  goog.abstractMethod;


/**
 * Execute GET request callback results to df.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df deferred to feed result.
 * @param {string} store_name table name.
 * @param {!Array.<!IDBKey>} ids id to get.
 * @throws {ydn.db.InvalidKeyException}
 * @throws {ydn.error.InternalError}
 */
ydn.db.crud.req.IRequestExecutor.prototype.listByIds = goog.abstractMethod;


/**
 * Execute GET request callback results to df.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df deferred to feed result.
 * @param {!Array.<!ydn.db.Key>} keys id to get.
 */
ydn.db.crud.req.IRequestExecutor.prototype.listByKeys = goog.abstractMethod;

/**
 * Execute GET request callback results to df.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df deferred to feed result.
 * @param {string} store name.
 * @param {IDBKeyRange} key range to get.
 * @param {boolean} reverse to sort reverse order.
 * @param {number} limit the results.
 * @param {number} offset skip first results.
 */
ydn.db.crud.req.IRequestExecutor.prototype.listByKeyRange = goog.abstractMethod;

/**
 * Execute GET request callback results to df.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df deferred to feed result.
 * @param {string} store name.
 * @param {string} index name.
 * @param {IDBKeyRange} key range to get.
 * @param {boolean} reverse to sort reverse order.
 * @param {number} limit the results.
 * @param {number} offset skip first results.
 * @param {boolean} unique unique key.
 */
ydn.db.crud.req.IRequestExecutor.prototype.listByIndexKeyRange = goog.abstractMethod;


/**
 * List records from stores.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {string} store_name  store name.
 * @deprecated
 */
ydn.db.crud.req.IRequestExecutor.prototype.listByStore = goog.abstractMethod;

/**
 * Execute PUT request to the store of given records in delimited text.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} df deferred to feed result.
 * @param {string} store_name table name.
 * @param {string} data delimited text to put. one object per line.
 * @param {string} delimiter field delimiter.
 */
ydn.db.crud.req.IRequestExecutor.prototype.putData = goog.abstractMethod;

/**
 * Put object and return key inserted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return key in deferred function.
 * @param {string} store table name.
 * @param {!Object} obj object to put.
 * @param {(!Array|string|number)=} opt_key optional out-of-line key.
 */
ydn.db.crud.req.IRequestExecutor.prototype.putObject = goog.abstractMethod;


/**
 * Put objects and return list of key inserted.
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return keys in deferred function.
 * @param {string} store_name store name.
 * @param {!Array.<!Object>} objs object to put.
 * @param {!Array.<(!Array|string|number)>=} opt_key optional out-of-line keys.
 */
ydn.db.crud.req.IRequestExecutor.prototype.putObjects = goog.abstractMethod;


/**
 * @param {ydn.db.con.IDatabase.Transaction} tx
 *  @param {string} tx_no transaction number
 * @param {?function(*, boolean=)} return object in deferred function.
 * @param {!Array.<Object>} objs object to put.
 * @param {!Array.<!ydn.db.Key>} keys list of keys.
 */
ydn.db.crud.req.IRequestExecutor.prototype.putByKeys = goog.abstractMethod;




