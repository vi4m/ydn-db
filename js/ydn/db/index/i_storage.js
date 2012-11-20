/**
 * @fileoverview Interface for executing database request.
 *
 */


goog.provide('ydn.db.index.IStorage');
goog.require('ydn.db.index.req.IRequestExecutor');
goog.require('ydn.db.core.IStorage');



/**
 * @extends {ydn.db.core.IStorage}
 * @interface
 */
ydn.db.index.IStorage = function() {};

//
//
///**
// * @throws {ydn.db.ScopeError}
// * @param {function(!ydn.db.index.req.IRequestExecutor)} callback callback function
// * when request executor is ready.
// * @param {!Array.<string>} store_names store name involved in the transaction.
// * @param {ydn.db.base.TransactionMode} mode mode, default to 'readonly'.
// */
//ydn.db.index.IStorage.prototype.exec = goog.abstractMethod;


