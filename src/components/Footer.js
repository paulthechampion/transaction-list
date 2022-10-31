import React from "react"
import phone from "../assets/phone.jpg"
import email from "../assets/email.png"

export default function Footer () {
	return (
		<footer>
			<div>
				<a className="call-me" href="tel: 6475342898"> <img src={phone} alt="call me" className="call-me-img"/> </a>
				<a className="email-me" href="mailto: enwerempaulo@gmail.com"> <img src={email} alt="email me" className="email-me-img"/>  </a>
				<span className="copyright">Built and Designed by Enwerem Nkechukwu Paul © 2022</span>
			</div>
		</footer>
	)
}
