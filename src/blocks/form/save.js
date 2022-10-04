/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal Dependencies
 */
import { EPEADefault } from "../../utils/block-icons";

export default function edit({ attributes, setAttributes }) {
	const { clientid, recipients, mailSubject, anchor, extraClass } = attributes;

	return (
		<form
			id={anchor ? anchor : null}
			className={classnames("gbblocks--form", extraClass ? extraClass : null)}
			method="post"
			novalidate
		>
			<input type="hidden" name="clientId" value={clientid} />
			<div className="row-wrapper row-wrapper--ct-wd">
				<div className="row row--xs-center row--col-ht row--gap-2">
					<div className="col col--xs-12 col--lg-6 col--pd-0">
						<input type="hidden" name="time" />
						<div className="row row--xs-center row--col-ht row--gap-2">
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("First Name", "gbblocks")} class="form-label">
									{__("First Name", "gbblocks")}
								</label>
								<input
									name="con_name"
									type="text"
									id="con_name"
									class="hide-robot"
								/>
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
								<label for={__("Last name", "gbblocks")} class="form-label">
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
	);
}
