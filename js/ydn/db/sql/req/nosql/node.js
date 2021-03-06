// Copyright 2012 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview IDB query node.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.db.sql.req.nosql.Node');
goog.require('ydn.db.Iterator');
goog.require('ydn.db.KeyRange');
goog.require('ydn.db.Sql');
goog.require('ydn.error.ArgumentException');



/**
 * Create a SQL query object from a query object.
 *
 * @param {!ydn.db.schema.Store} schema store schema.
 * @param {!ydn.db.Sql} sql store name.
 * @constructor
 * @struct
 */
ydn.db.sql.req.nosql.Node = function(schema, sql) {

  this.sql = sql;
  this.store_schema = schema;

};


/**
 * @protected
 * @type {goog.debug.Logger} logger.
 */
ydn.db.sql.req.nosql.Node.prototype.logger =
    goog.debug.Logger.getLogger('ydn.db.sql.req.nosql.Node');


/**
 * @type {!ydn.db.schema.Store}
 * @protected
 */
ydn.db.sql.req.nosql.Node.prototype.store_schema;


/**
 * @type {ydn.db.Sql}
 * @protected
 */
ydn.db.sql.req.nosql.Node.prototype.sql;


/**
 * @inheritDoc
 */
ydn.db.sql.req.nosql.Node.prototype.toJSON = function() {
  return {'sql': this.sql};
};


/**
 * @override
 */
ydn.db.sql.req.nosql.Node.prototype.toString = function() {
  return 'idb.Node:';
};


/**
 * @param {ydn.db.con.IDatabase.Transaction} tx
 * @param {string} tx_no
 * @param {?function(*, boolean=)} df return key in deferred function.
 * @param {ydn.db.core.req.IRequestExecutor} req
 */
ydn.db.sql.req.nosql.Node.prototype.execute = function(tx, tx_no, df, req) {

  var me = this;
  var out = [];

  var store_name = this.sql.getStoreNames()[0];
  var wheres = this.sql.getConditions();
  var limit = this.sql.getLimit();
  limit = isNaN(limit) ? ydn.db.base.DEFAULT_RESULT_LIMIT : limit;
  var offset = this.sql.getOffset();
  offset = isNaN(offset) ? 0 : offset;
  var order = this.sql.getOrderBy();
  var sel_fields = this.sql.getSelList();
  /**
   *
   * @type {IDBKeyRange}
   */
  var key_range = null;
  var reverse = this.sql.isReversed();
  if (wheres.length == 0) {
    key_range = null;
  } else if (wheres.length == 1) {
    key_range = ydn.db.KeyRange.parseIDBKeyRange(wheres[0].getKeyRange());
  } else {
    throw new ydn.debug.error.NotSupportedException('too many conditions.');
  }

  var ndf = df;
  if (!goog.isNull(sel_fields)) {
    ndf = function(records, is_error) {
      if (is_error) {
        df(records, true);
      } else {
        var out = records.map(function(record) {
          var n = sel_fields.length;
          if (n == 1) {
            return ydn.db.utils.getValueByKeys(record, sel_fields[0]);
          } else {
            var obj = {};
            for (var i = 0; i < n; i++) {
              obj[sel_fields[i]] = ydn.db.utils.getValueByKeys(record,
                  sel_fields[i]);
            }
            return obj;
          }
        });
        df(out);
      }
    };
  }

  var index_name = wheres.length > 0 ? wheres[0].getField() : undefined;

  var msg = tx_no + ' executing on' + store_name;
  if (index_name) {
    msg += ':' + index_name;
  }
  msg += ' ' + ydn.db.KeyRange.toString(key_range);
  this.logger.finer(msg);

  if (order && order != this.store_schema.getKeyPath()) {
    req.listByIndexKeyRange(tx, tx_no, ndf, store_name, order, key_range,
        reverse, limit, offset, false);
  } else if (goog.isDef(index_name) && index_name !=
      this.store_schema.getKeyPath()) {
    req.listByIndexKeyRange(tx, tx_no, ndf, store_name, index_name,
        key_range, reverse, limit, offset, false);
  } else {
    req.listByKeyRange(tx, tx_no, ndf, store_name, key_range, reverse, limit,
        offset);
  }

};




