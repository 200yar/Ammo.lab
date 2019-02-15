/*global THREE*/
import { root, map } from './root.js';

function Collision() {

	this.ID = 0;
	this.pairs = [];

}

Object.assign( Collision.prototype, {

	step: function ( AR, N ) {

		this.pairs.forEach( function ( pair, id ) {

            pair.callback( AR[ N + id ] || 0 );

        });

	},

	clear: function () {

		while ( this.pairs.length > 0 ) this.destroy( this.pairs.pop() );
		this.ID = 0;

	},

	destroy: function ( b ) {

		b.clear();
		map.delete( b.name );

	},

	remove: function ( name ) {

		if ( ! map.has( name ) ) return;
		var p = map.get( name );

		var n = this.pairs.indexOf( p );
		if ( n !== - 1 ) {

			this.pairs.splice( n, 1 );
			this.destroy( p );

		}

	},

	add: function ( o, extra ) {


		var name = o.name !== undefined ? o.name : 'pair' + this.ID ++;

		// delete old if same name
		this.remove( name );

	    var pair = new Pair( name, o.callback );

        this.pairs.push( pair );

        delete( o.callback );
        //o.callback = null;

		map.set( name, pair );

		root.post( 'add', o );

	},




} );


export { Collision };


//--------------------------------------------------
//
//  CONTACT CLASS
//
//--------------------------------------------------

function Pair( name, callback ) {

	this.name = name;
	this.callback = callback;

}

Object.assign( Pair.prototype, {

	clear: function () {

		this.name = null;
		this.callback = null;

	}

} );

export { Pair };