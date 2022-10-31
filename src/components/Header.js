import React from "react"
import Logo from "../assets/moneyLogo.png"

export default function Header() {
	return (
		<header>
			<nav>
				<div>
					<img src={Logo} alt="Logo"/>
				</div>
				<ul>
					<li>
						<a href="/"> Add Transactions</a>
					</li>
					<li>
						<a href="/all-transactions"> All Transactions</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}
