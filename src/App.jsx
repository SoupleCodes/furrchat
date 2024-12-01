import './App.css';

function App() {
	return (
		<>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td align="center" style={{ background: "url('Header bg.png') no-repeat center center", backgroundSize: "cover" }}>
							<table width="990" height="75" border="0" cellPadding="0" cellSpacing="0" align="center" id="table-heading">
								<tr>
									<td height="64" width="40"></td>
									<td height="64" align="left"><a href="/"><img src="Logo.png" border="0" height="75" /></a></td>
									<td height="64" width="169" align="right"><a href="/"><img src="http://www.stardock.com/images/spacer.gif" height="64" width="40" /></a></td>
								</tr>
							</table>
						</td>
					</tr>
				</tbody>
			</table>

			<table width="100%" height="20" border="0" cellPadding="0" cellspacing="0" background="Navbar texture.png" style={{ boxShadow: "0px 0px 4px black" }}>
				<tbody>
					<tr>
						<td align="center">
							<table width="990" height="26" border="0" cellPadding="0" cellspacing="0">
								<tbody>
									<tr>
										<td width="45"></td>
										<a target="_top" href="/"><img src="Buttons/Home.png" border="0" height="26" onmouseover="this.src='http://www.stardock.com/images/mbtn-home-hov.gif';" onmouseout="this.src='http://www.stardock.com/images/mbtn-home-norm.gif';" /></a>
										<a target="_top" href="/"><img src="Buttons/Inbox.png" border="0" height="26" onmouseover="this.src='http://www.stardock.com/images/mbtn-products-hov.gif';" onmouseout="this.src='http://www.stardock.com/images/mbtn-products-norm.gif';" /></a>
										<a target="_top" href="/"><img src="Buttons/Settings.png" border="0" height="26" onmouseover="this.src='http://www.stardock.com/images/mbtn-downloads-hov.gif';" onmouseout="this.src='http://www.stardock.com/images/mbtn-downloads-norm.gif';" /></a>
										<a target="_top" href="http://stardock.com/coming_soon/index.asp" onmouseover="document.images['mbtn-coming_soon'].src='/images/mbtn-coming_soon-hov.gif';" onmouseout="document.images['mbtn-coming_soon'].src='/images/mbtn-coming_soon-norm.gif';"><img name="mbtn-coming_soon" src="/images/mbtn-coming_soon-norm.gif" border="0" height="26" width="96" /></a>
										<a target="_top" href="http://forums.stardock.com/"><img src="http://www.stardock.com/images/mbtn-forums-norm.gif" border="0" height="26" width="77" onmouseover="this.src='http://www.stardock.com/images/mbtn-forums-hov.gif';" onmouseout="this.src='http://www.stardock.com/images/mbtn-forums-norm.gif';" /></a>
										<a target="_top" href="http://about.stardock.com/"><img src="http://www.stardock.com/images/mbtn-about-norm.gif" border="0" height="26" width="88" onmouseover="this.src='http://www.stardock.com/images/mbtn-about-hov.gif';" onmouseout="this.src='http://www.stardock.com/images/mbtn-about-norm.gif';" /></a>
										<form name="mbarsearch" id="Form1" target="_top" action="/search.asp"></form>
										<input type="hidden" name="cx" value="000252501301640439162:lsdbilb-yow" id="Hidden4" />
										<input type="hidden" name="cof" value="FORID:11" id="Hidden5" />
										<td height="26" width="137" background="http://www.stardock.com/images/searchbox.gif" valign="middle">
											<input class="mbarsearchbutton" style={{ position: "absolute", marginLeft: "115px", marginTop: "-23px" }} width="17" height="17" align="middle" type="Image" src="/images/btn-mbarsearch.gif" id="Image1" name="Image1" />
											&nbsp;
											<input name="q" type="text" size="40" align="middle" class="mbarsearch2" value="" onclick="this.value='';" id="q" />
										</td>
										<td>&nbsp;</td>
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