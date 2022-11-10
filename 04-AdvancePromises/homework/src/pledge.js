"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  //propiedades
  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];

  //metodos
  $Promise.prototype._internalResolve = function (data) {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = data;
      if (this._handlerGroups.length > 0) this._callHandlers();
    }
  };

  $Promise.prototype._internalReject = function (reason) {
    if (this._state === "pending") {
      this._state = "rejected";
      this._value = reason;
      if (this._handlerGroups.length > 0) this._callHandlers();
    }
  };

  const internalResolveBinded = this._internalResolve.bind(this);
  const internalRejectBinded = this._internalReject.bind(this);

  $Promise.prototype.resolve = function (data) {
    internalResolveBinded(data);
  };
  $Promise.prototype.reject = function (reason) {
    internalRejectBinded(reason);
  };

  if (typeof executor !== "function") {
    throw new TypeError("The param 'executor' recieved isn't a function.");
  } else {
    executor(this.resolve, this.reject);
  }

  $Promise.prototype._callHandlers = function () {
    
    let shift = () => {
      this._handlerGroups.shift();
    };

    while (this._handlerGroups.length > 0) { 
      let success = this._handlerGroups[0].successCb;
      let error = this._handlerGroups[0].errorCb;

      if (this._state === "fulfilled" && typeof success === "function") {
        // let successReturn = success(this._value);
        // this._handlerGroups[0].downstreamPromise._internalResolve(successReturn);
        // shift();

        
        // try {
        //   let successReturn = success(this._value);
        //   this._handlerGroups[0].downstreamPromise._internalResolve(successReturn);
        // } catch (e) {
        //   this._handlerGroups[0].downstreamPromise._internalReject(e);
        // }
        // shift();

        try {
          let successReturn = success(this._value);
          if (successReturn instanceof $Promise) {
            console.log(this._handlerGroups[0].downstreamPromise);
            this._handlerGroups[0].downstreamPromise = successReturn;
            this._handlerGroups[0].downstreamPromise._internalResolve(successReturn._value);
          } else {
            this._handlerGroups[0].downstreamPromise._internalResolve(successReturn);
          }
        } catch (e) {
          this._handlerGroups[0].downstreamPromise._internalReject(e);
        }
        shift();

      } else if (this._state === "fulfilled" && !success) {
        this._handlerGroups[0].downstreamPromise._internalResolve(this._value);
        shift();
      } else if (this._state === "rejected" && typeof error === "function") {
        // let errorReturn = error(this._value);
        // this._handlerGroups[0].downstreamPromise._internalResolve(errorReturn);
        // shift();

        try {
          let errorReturn = error(this._value);
          this._handlerGroups[0].downstreamPromise._internalResolve(errorReturn);
        } catch (e) {
          this._handlerGroups[0].downstreamPromise._internalReject(e);
        }
        shift();

      } else if (this._state === "rejected" && !error) {
        this._handlerGroups[0].downstreamPromise._internalReject(this._value);
        shift();
      } else break;
    }
  };

  $Promise.prototype.then = function (cb1, cb2) {
    let obj = {};
    if (typeof cb1 !== "function") obj.successCb = false;
    else obj.successCb = cb1;
    if (typeof cb2 !== "function") obj.errorCb = false;
    else obj.errorCb = cb2;
    this._handlerGroups.push(obj);

    obj.downstreamPromise = new $Promise(executor);

    if (this._state !== "pending") {
      this._callHandlers();
    }

    return obj.downstreamPromise;
  };

  $Promise.prototype.catch = function (func) {
    let downstreamPromise = this.then(null, func);
    return downstreamPromise;
  };
}

// ---------------------🚫🛑  debugging zone 🛑🚫---------------------
function noop () {}
var promiseA = new $Promise(noop);
var promiseB = promiseA.then(function(){ return promiseZ });
var promiseZ = new $Promise(noop);
promiseA._internalResolve();
promiseZ._internalResolve( 'testing' );



console.log('end');
// ---------------------🚫🛑  debugging zone 🛑🚫---------------------

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
