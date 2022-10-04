/**
 * Return Jnext Timeline Block Dynamic generated Classes
 */

function cardClasses(attributes) {
	const {
		xsColumnCount,
		smColumnCount,
		mdColumnCount,
		lgColumnCount,
		xlColumnCount,
	} = attributes;

	let colClasses = '';

	// col width
	//IF XS is set ---------------------------------------------------------
	if (xsColumnCount != 0) {
		colClasses += ' col--xs-' + xsColumnCount;
	} else {
		colClasses += ' col--xs-12';
	}

	//IF SM is set ---------------------------------------------------------
	if (smColumnCount != 0) {
		//IF XS is set
		if (xsColumnCount != 0) {
			//IF SM is unequal XS
			if (smColumnCount != xsColumnCount) {
				colClasses += ' col--sm-' + smColumnCount;
			}
		}

		//IF XS is notset
		else {
			// IF SM is unequal 12
			if (smColumnCount != 12) {
				colClasses += ' col--sm-' + smColumnCount;
			}
		}
	}

	//IF MD is set ---------------------------------------------------------
	if (mdColumnCount != 0) {
		//IF SM is set
		if (smColumnCount != 0) {
			//IF MD is unequal SM
			if (mdColumnCount != smColumnCount) {
				colClasses += ' col--md-' + mdColumnCount;
			}
		}

		//IF SM is notset
		else {
			//IF XS is set
			if (xsColumnCount != 0) {
				//IF MD is unequal XS
				if (mdColumnCount != xsColumnCount) {
					colClasses += ' col--md-' + mdColumnCount;
				}

				//IF XS is default
			} else {
				// IF MD is unequal 12
				if (mdColumnCount != 12) {
					colClasses += ' col--md-' + mdColumnCount;
				}
			}
		}
	}

	//IF LG is set ---------------------------------------------------------
	if (lgColumnCount != 0) {
		//IF MD is set
		if (mdColumnCount != 0) {
			//IF LG is unequal MD
			if (lgColumnCount != mdColumnCount) {
				colClasses += ' col--lg-' + lgColumnCount;
			}
		}

		//IF MD is notset
		else {
			//IF SM is set
			if (smColumnCount != 0) {
				//IF LG is unequal SM
				if (lgColumnCount != smColumnCount) {
					colClasses += ' col--lg-' + lgColumnCount;
				}

				//IF SM is notset
			} else {
				//IF XS is set
				if (xsColumnCount != 0) {
					//IF LG is unequal XS
					if (lgColumnCount != xsColumnCount) {
						colClasses += ' col--lg-' + lgColumnCount;
					}

					//IF XS is default
				} else {
					// IF LG is unequal 12
					if (lgColumnCount != 12) {
						colClasses += ' col--lg-' + lgColumnCount;
					}
				}
			}
		}
	}

	//IF XL is set ---------------------------------------------------------
	if (xlColumnCount != 0) {
		//IF LG is set
		if (lgColumnCount != 0) {
			//IF XL is unequal LG
			if (xlColumnCount != lgColumnCount) {
				colClasses += ' col--xl-' + xlColumnCount;
			}
		}

		//IF LG is notset
		else {
			//IF MD is set
			if (mdColumnCount != 0) {
				//IF XL is unequal MD
				if (xlColumnCount != mdColumnCount) {
					colClasses += ' col--xl-' + xlColumnCount;
				}
			}

			//IF MD is notset
			else {
				//IF SM is set
				if (smColumnCount != 0) {
					//IF XL is unequal SM
					if (xlColumnCount != smColumnCount) {
						colClasses += ' col--xl-' + xlColumnCount;
					}

					//IF SM is notset
				} else {
					//IF XS is set
					if (xsColumnCount != 0) {
						//IF XL is unequal XS
						if (xlColumnCount != xsColumnCount) {
							colClasses += ' col--xl-' + xlColumnCount;
						}

						//IF XS is default
					} else {
						// IF XL is unequal 12
						if (xlColumnCount != 12) {
							colClasses += ' col--xl-' + xlColumnCount;
						}
					}
				}
			}
		}
	}
	// ---------------------------------------------------------------------

	return colClasses;
}
export default cardClasses;
