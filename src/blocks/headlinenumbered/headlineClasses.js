function headlineClasses(attributes) {
	const { xlwidth, lgwidth, mdwidth, smwidth, xswidth } = attributes;

	let headlineClasses = '';
	//IF XS is set ---------------------------------------------------------
	if (xswidth != 0) {
		headlineClasses += ' col--xs-' + xswidth;
	} else {
		headlineClasses += ' col--xs-12';
	}

	//IF SM is set ---------------------------------------------------------
	if (smwidth != 0) {
		//IF XS is set
		if (xswidth != 0) {
			//IF SM is unequal XS
			if (smwidth != xswidth) {
				headlineClasses += ' col--sm-' + smwidth;
			}
		}

		//IF XS is notset
		else {
			// IF SM is unequal 12
			if (smwidth != 12) {
				headlineClasses += ' col--sm-' + smwidth;
			}
		}
	}

	//IF MD is set ---------------------------------------------------------
	if (mdwidth != 0) {
		//IF SM is set
		if (smwidth != 0) {
			//IF MD is unequal SM
			if (mdwidth != smwidth) {
				headlineClasses += ' col--md-' + mdwidth;
			}
		}

		//IF SM is notset
		else {
			//IF XS is set
			if (xswidth != 0) {
				//IF MD is unequal XS
				if (mdwidth != xswidth) {
					headlineClasses += ' col--md-' + mdwidth;
				}

				//IF XS is default
			} else {
				// IF MD is unequal 12
				if (mdwidth != 12) {
					headlineClasses += ' col--md-' + mdwidth;
				}
			}
		}
	}

	//IF LG is set ---------------------------------------------------------
	if (lgwidth != 0) {
		//IF MD is set
		if (mdwidth != 0) {
			//IF LG is unequal MD
			if (lgwidth != mdwidth) {
				headlineClasses += ' col--lg-' + lgwidth;
			}
		}

		//IF MD is notset
		else {
			//IF SM is set
			if (smwidth != 0) {
				//IF LG is unequal SM
				if (lgwidth != smwidth) {
					headlineClasses += ' col--lg-' + lgwidth;
				}

				//IF SM is notset
			} else {
				//IF XS is set
				if (xswidth != 0) {
					//IF LG is unequal XS
					if (lgwidth != xswidth) {
						headlineClasses += ' col--lg-' + lgwidth;
					}

					//IF XS is default
				} else {
					// IF LG is unequal 12
					if (lgwidth != 12) {
						headlineClasses += ' col--lg-' + lgwidth;
					}
				}
			}
		}
	}

	//IF XL is set ---------------------------------------------------------
	if (xlwidth != 0) {
		//IF LG is set
		if (lgwidth != 0) {
			//IF XL is unequal LG
			if (xlwidth != lgwidth) {
				headlineClasses += ' col--xl-' + xlwidth;
			}
		}

		//IF LG is notset
		else {
			//IF MD is set
			if (mdwidth != 0) {
				//IF XL is unequal MD
				if (xlwidth != mdwidth) {
					headlineClasses += ' col--xl-' + xlwidth;
				}
			}

			//IF MD is notset
			else {
				//IF SM is set
				if (smwidth != 0) {
					//IF XL is unequal SM
					if (xlwidth != smwidth) {
						headlineClasses += ' col--xl-' + xlwidth;
					}

					//IF SM is notset
				} else {
					//IF XS is set
					if (xswidth != 0) {
						//IF XL is unequal XS
						if (xlwidth != xswidth) {
							headlineClasses += ' col--xl-' + xlwidth;
						}

						//IF XS is default
					} else {
						// IF XL is unequal 12
						if (xlwidth != 12) {
							headlineClasses += ' col--xl-' + xlwidth;
						}
					}
				}
			}
		}
	}

	return [headlineClasses];
}
export default headlineClasses;
