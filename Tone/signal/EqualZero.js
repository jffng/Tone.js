define(["Tone/core/Tone", "Tone/signal/Threshold"], function(Tone){

	/**
	 *  Output 1 if the signal is equal to 0, otherwise outputs 0
	 *  
	 *  @constructor
	 *  @extends {Tone}
	 */
	Tone.EqualZero = function(){
		/**
		 *  @type {WaveShaperNode}
		 *  @private
		 */
		this._equals = this.context.createWaveShaper();

		/**
		 *  @type {WaveShaperNode}
		 *  @private
		 */
		this._thresh = new Tone.Threshold(1);

		/**
		 *  @type {WaveShaperNode}
		 */
		this.input = this._equals;

		this._equals.connect(this._thresh);

		this.output = this._thresh;


		this._setEquals();
	};

	Tone.extend(Tone.EqualZero);

	/**
	 *  @private
	 */
	Tone.EqualZero.prototype._setEquals = function(){
		var curveLength = 1024;
		var curve = new Float32Array(curveLength);
		for (var i = 0; i < curveLength; i++){
			var normalized = (i / (curveLength)) * 2 - 1;
			if (normalized === 0){
				curve[i] = 1;
			} else {
				curve[i] = 0;
			}
		}
		this._equals.curve = curve;
	};

	/**
	 *  dispose method
	 */
	Tone.EqualZero.prototype.dispose = function(){
		this._equals.disconnect();
		this._thresh.dispose();
		this._equals = null;
		this._thresh = null;
	};

	return Tone.EqualZero;
});