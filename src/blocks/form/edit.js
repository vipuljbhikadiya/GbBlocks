/**
 * External Dependencies
 */
import classnames from "classnames";
import { isEqual } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import { PanelBody, TextControl } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import { EPEADefault } from "../../utils/block-icons";

export default function edit({ attributes, setAttributes, clientId }) {
	const { clientid, recipients, mailSubject, anchor, extraClass } = attributes;

	const contactForm = useRef();

	useEffect(() => {
		clientid === "" && setAttributes({ clientid: clientId });
		const { ownerDocument } = contactForm.current;
		var hideFields = ownerDocument.querySelectorAll(".hide-robot");
		hideFields.forEach(function (field) {
			field.style.display = "none";
		});
	}, []);

	return (
		<div {...useBlockProps()}>
			<Fragment>
				<InspectorControls>
					<PanelBody title={"Settings"}>
						<TextControl
							label={__("Mail Recipients", "gbblocks")}
							placeholder={__("Specify Email with comma seprated…", "gbblocks")}
							type="text"
							value={recipients}
							onChange={(value) => setAttributes({ recipients: value })}
						/>
						<TextControl
							label={__("Mail Subject", "gbblocks")}
							placeholder={__("Specify Mail Subject…", "gbblocks")}
							type="text"
							value={mailSubject}
							onChange={(value) => setAttributes({ mailSubject: value })}
						/>
					</PanelBody>
					<PanelBody title={__("Additional", "gbblocks")} initialOpen={true}>
						<TextControl
							label={__("Anchor", "gbblocks")}
							placeholder={__("Specify Id…", "gbblocks")}
							type="text"
							value={anchor}
							onChange={(value) => setAttributes({ anchor: value })}
						/>
						<TextControl
							label={__("Class", "gbblocks")}
							placeholder={__("Specify class…", "gbblocks")}
							type="text"
							value={extraClass}
							onChange={(value) => setAttributes({ extraClass: value })}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
			<form
				id={anchor ? anchor : null}
				className={classnames("gbblocks--form", extraClass ? extraClass : null)}
				method="post"
				novalidate
				ref={contactForm}
			>
				<input type="hidden" name="clientId" value={clientid} />
				<div className="row-wrapper row-wrapper--ct-wd">
					<div className="row row--xs-center row--col-ht row--gap-2">
						<div className="col col--xs-12 col--lg-6 col--pd-0">
							<input type="hidden" name="time" />
							<div className="row row--xs-center row--col-ht row--gap-2">
								<div className="col col--xs-12 col--lg-6 col--pd-0">
									<input
										name="con_name"
										type="text"
										id="con_name"
										class="hide-robot"
									/>
									<label for={__("First Name", "gbblocks")} class="form-label">
										{__("First Name", "gbblocks")}
									</label>
									<input
										type="text"
										class="form-control"
										id="firstname"
										name="firstname"
										autocomplete="off"
										required="required"
									/>
									<div class="error-msg"></div>
								</div>
								<div className="col col--xs-12 col--lg-6 col--pd-0">
									<label for={__("Last Name", "gbblocks")} class="form-label">
										{__("Last name", "gbblocks")}
									</label>
									<input
										type="text"
										class="form-control"
										id="lastname"
										name="lastname"
										autocomplete="off"
										required="required"
									/>
									<div class="error-msg"></div>
								</div>
							</div>
							<div className="row row--xs-center row--col-ht row--gap-2">
								<div className="col col--xs-12 col--pd-0">
									<label for={__("Company", "gbblocks")} class="form-label">
										{__("Company", "gbblocks")}
									</label>
									<input
										type="text"
										class="form-control"
										id="company"
										name="company"
										autocomplete="off"
										required="required"
									/>
									<div class="error-msg"></div>
								</div>
							</div>
							<div className="row row--xs-center row--col-ht row--gap-0">
								<div className="col col--xs-12 col--pd-0">
									<label for={__("E-Mail", "gbblocks")} class="form-label">
										{__("E-Mail", "gbblocks")}
									</label>
									<input
										type="email"
										class="form-control"
										id="email"
										name="email"
										autocomplete="off"
										required="required"
									/>
									<div class="error-msg"></div>
								</div>
							</div>
						</div>
						<div className="col col--xs-12 col--lg-6 col--pd-0">
							<div className="row row--xs-center row--col-ht row--gap-2">
								<div className="col col--xs-12 col--pd-0">
									<label for={__("Message", "gbblocks")} class="form-label">
										{__("Message", "gbblocks")}
									</label>
									<textarea
										type="text"
										class="form-control"
										id="message"
										name="message"
										rows="4"
									></textarea>
								</div>
							</div>
							<div className="row row--xs-center row--col-ht row--gap-0">
								<div className="col col--xs-12 col--pd-0">
									<label for={__("Privacy", "gbblocks")} className="acceptance">
										<input
											type="checkbox"
											name="acceptPrivacy"
											value="1"
											required="required"
										/>
										<span class="form-label">
											{__(
												"Yes, I have read the data protection declaration and agree that the data I have provided will be collected and stored electronically.",
												"gbblocks"
											)}
										</span>
									</label>
									<div class="error-msg"></div>
								</div>
							</div>
						</div>
						<div className="col col--xs-12 col--pd-0">
							<label for="submit" className="submit--button">
								<span class="button--has-icon">
									<div class="icon icon--bgcolor-one icon--color-six">
										<div class="icon__helper"></div>
										<EPEADefault />
									</div>
								</span>
								<input
									type="submit"
									value={__("Send Message", "gbblocks")}
									class="button--cta button--style-one button--width-inline button--color-four button--icon button--align-xs-left"
									name="submit"
								/>
							</label>
						</div>
						<div className="col col--xs-12 col--pd-0 response">
							<p className="response-message"></p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
