import './App.css';
import { useState } from 'react';

function App() {
	const [hoveredButton, setHoveredButton] = useState(null);

	const handleMouseOver = (buttonName) => {
		setHoveredButton(buttonName);
	};

	const handleMouseOut = () => {
		setHoveredButton(null);
	};

	const buttons = [
		{ name: 'Home', alt: 'Home', href: '/' },
		{ name: 'Inbox', alt: 'Inbox', href: '/' },
		{ name: 'Settings', alt: 'Settings', href: '/' },
		{ name: 'About', alt: 'About', href: '/' },
		{ name: 'Login', alt: 'Login', href: '/' },
		{ name: 'Register', alt: 'Register', href: '/' },
	];

	return (
		<>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td align="center" style={{ background: "url('Header bg.png') no-repeat center center", backgroundSize: "cover" }}>
							<table width="990" height="85" border="0" cellPadding="0" cellSpacing="0" align="center" id="table-heading">
								<tr>
									<td height="64" width="40"></td>
									<td height="64" align="left"><a href="/"><img src="Logo.png" border="0" height="75" /></a></td>
									<td height="64" width="169" align="right"></td>
								</tr>
							</table>
						</td>
					</tr>
				</tbody>
			</table>


			<table width="100%" height="26" border="0" cellpadding="0" cellspacing="0" id="navbar" style={{ boxShadow: "0px 0px 4px black" }}>
				<tbody>
					<tr>
						<td align="center">
							<table width="990" height="26" border="0" cellpadding="0" cellspacing="0">
								<tbody>
									<tr>
										<td width="45" height="1"></td>
										{buttons.map((button) => (
											<a
												key={button.name}
												target="_top"
												href={button.href}
												onMouseOver={() => handleMouseOver(button.name)}
												onMouseOut={handleMouseOut}
											>
												<img
													src={`Buttons/${button.name}${hoveredButton === button.name ? '-hovered' : ''}.png`}
													border="0"
													height="26"
													alt={button.alt}
												/>
											</a>
										))}
										<td width="45" height="1"></td>
										<td>
										<img src="searchbar.png" border="0" height="26" alt="Search" />
											<input type="text" id="searchbar" />
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>

		</>
	);
}

export default App;