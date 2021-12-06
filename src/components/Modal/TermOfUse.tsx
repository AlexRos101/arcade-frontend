import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import { ThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import RowLabel from 'components/Label/RowLabel'
import TextParam from 'components/Label/TextParam'
import { Button } from '@material-ui/core'
import { dialogTheme } from 'styles/theme'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  onClose: () => void
}

const TermOfUse: React.FC<Props> = (props) => {
  return (
    <Dialog
      className="card-dialog"
      onClose={props.onClose}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogTitle className="modal-dialog-title">
        <RowLabel>Terms Of Use</RowLabel>
      </DialogTitle>
      <DialogContent className="modal-dialog-content scroll-content" dividers>
        <div>
          <TextParam>
These Terms of Use (the “Terms of Use”) constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you") and the Owner of Arcade (“we", “us", or “our") concerning your access to and use of the https://http://arcadetoken.games website and the Arcade Game as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site" and the “Game”). The Terms of Use may be, at our own rights and discretions, updated from time to time and shall immediately take effect and bind you to follow and be regulated without receiving your concerns and consents so long as you are using our Game and Site. The Game is a distributed application that is currently running on the Binance Smart Chain (the "Blockchains"), using smart contracts (each, a “Contract”) to enable users to play the game. Using the Site, users can view their assets, control the user’s character and use them to acquire, trade, plant, grow, and battle with Monsters with other Game users.
</TextParam><TextParam>
WE ARE ONLY WILLING TO MAKE THE SITE AND THE GAME AVAILABLE TO YOU IF YOU ACCEPT ALL OF THE TERMS OF USE. BY USING THE SITE, THE GAME, ITS ASSOCIATING MEDIA, OR ANY PART OF IT, OR BY SIGNING UP WITH EMAIL, AND/OR YOUR CRYPTO WALLET, YOU ARE CONFIRMING THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY ALL OF THE TERMS OF USE. IF YOU DO NOT AGREE AND/OR ACCEPT ALL OF THE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE, THE GAME, AND ITS ASSOCIATING SERVICES, AND YOU MUST DISCONTINUE TO USE AND/ OR USING SUCH IMMEDIATELY.
</TextParam><TextParam>
Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to the Terms of Use at any time and for any reason. We shall alert you of any changes by updating the “Last Updated" date of the Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review the Terms of Use to stay informed of updates. You shall be subject to and shall be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site or the Game after the date such revised Terms of Use are posted.
</TextParam><TextParam>
The information on the Site is not intended for distribution to or used by any person or entity in any jurisdiction or country where such distribution or use would be contrary to the law or regulation thereof or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site and/or the Game from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
</TextParam><TextParam>
The Site and the Game are intended for individual users who have full legal capacity and are at least 18 years old and have reached the age of majority provided for the applicable laws of relevant jurisdictions. People under the age of 18 are not permitted to use or register for the Site and the Game.
</TextParam><TextParam>
<strong>1. INTELLECTUAL PROPERTY RIGHTS</strong>
</TextParam><TextParam>
Unless otherwise indicated, the Site and the Game are our proprietary property and all source codes, database, functionality, softwares, website designs, audios, videos, texts, photographs, and graphics on the Site, the Game and all other associating functions (collectively, the “Content") and trademarks, service marks and logos contained therein (the “Marks") are owned, controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of relevant jurisdictions and international conventions. Except as expressly provided in the Terms of Use, no part of the Site, the Game and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
</TextParam><TextParam>
Provided that you are eligible to use the Site and the Game, you are granted a limited license to access and use the Site and the Game or to download or print a copy of any portion of the Content to which you have properly gained access solely to your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Game, the Content, and the Marks.
</TextParam><TextParam>
<strong>2. USER REPRESENTATIONS</strong>
</TextParam><TextParam>
By using the Site, the Game, and the Contracts, you represent and warrant that:
</TextParam><TextParam>
• all registration information you submit to us shall be true, accurate, current, and complete;
</TextParam><TextParam>
• you shall maintain the accuracy of such information and promptly update such registration information as necessary;
</TextParam><TextParam>
• you have the legal capacity and you agree to comply with these Terms of Use;
</TextParam><TextParam>
• you are not a minor in the jurisdiction in which you reside;
</TextParam><TextParam>
• you shall not access the Site and/or the Game through automated and non-human means, whether through a bot, script or otherwise. except as expressly permitted by us;
</TextParam><TextParam>
• you shall not use the Site, the Game, and the Contracts for any illegal and unauthorized purpose; and
your use of the Site, the Game, and the Contracts shall not violate any applicable law or regulation. If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site, the Game, and the Contracts (or any portion thereof).
</TextParam><TextParam>
• you can only play on two devices per one IP address.
</TextParam><TextParam>
• you, as an account owner, are responsible for the actions of any individuals hired by you that play on your behalf and that their actions can have consequences for any connected accounts that you own.
</TextParam><TextParam>
• you have not been included in any trade embargoes or economic sanctions list (such as the United Nations Security Council Sanctions list). We reserve the right to choose markets and jurisdictions to conduct business, and may restrict or refuse, in our discretion, the provision of Arcade services in certain countries or regions.
</TextParam><TextParam>
<strong>3. USER REGISTRATION</strong>
</TextParam><TextParam>
You may be required to register with the Site, the Game and the Contracts. You agree to keep your password confidential and shall be responsible for all use of your account and password. We reserve the right to remove, reclaim or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
</TextParam><TextParam>
<strong>4. PROHIBITED ACTIVITIES</strong>
</TextParam><TextParam>
You may not access or use the Site, the Game, and the Contracts for any purpose other than that for which we make the Site, the Game, and the Contracts available at our sole discretion. The Site, the Game and the Contracts may not be used in connection with any commercial endeavors except if agreed to in a binding legal contract with us. You are specifically prohibited to conduct or be engaged acts including but not limited to:
</TextParam><TextParam>
• Systematically retrieve data or other content from the Site, and the Game to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
</TextParam><TextParam>
• Make any unauthorized use of the Site, the Game, the Content, the Marks, and the Contracts, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.
</TextParam><TextParam>
• Use a buying agent or purchasing agent to make purchases on the Site, the Game, and the Contracts.
</TextParam><TextParam>
• Use the Site, the Game, the Content, the Marks, and the Contracts to advertise or offer to sell goods and services.
</TextParam><TextParam>
• Circumvent, disable, or otherwise interfere with security-related features of the Site, the Game, and the Contracts, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site, the Game, and the Contracts and/or the Content contained therein.
</TextParam><TextParam>
• Engage in unauthorized framing of or linking to the Site, and the Contracts.
</TextParam><TextParam>
• The trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
</TextParam><TextParam>
• Make improper use of our support services or submit false reports of abuse or misconduct.
</TextParam><TextParam>
• Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools, except as expressly permitted by us)
</TextParam><TextParam>
• Interfere with, disrupt, or create an undue burden on the Site, the Game, the Contracts, or the networks or services connected to the Site.
</TextParam><TextParam>
• Attempt to impersonate another user or person or use the username of another user.
</TextParam><TextParam>
• Sell or otherwise transfer your profile.
</TextParam><TextParam>
• Use any information obtained from the Site, the Game, the Content, the Marks, and the Contracts in order to harass, abuse, or harm another person.
</TextParam><TextParam>
• Use the Site, the Game, the Content, the Marks, and the Contracts as part of any effort to compete with us or otherwise use the Site, and the Contracts, the Marks and/or the Content for any revenue-generating endeavor or commercial enterprise.
</TextParam><TextParam>
• Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site, the Game, or the Contracts.
</TextParam><TextParam>
• Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site, the Game, the Content, and the Contracts.
</TextParam><TextParam>
• Harass, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site, the Game, the Content, and the Contracts to you.
</TextParam><TextParam>
• Delete the copyright or other proprietary rights notice from any Content.
</TextParam><TextParam>
• Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
</TextParam><TextParam>
• Upload or transmit (or attempt to upload or to transmit) viruses, Trojan, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site and the Game or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site, the Game, or the Contracts.
</TextParam><TextParam>
• Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).
</TextParam><TextParam>
• Except as may be the result of standard search engines or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, the Game, or the Contracts, or using or launching any unauthorized script or other software.
</TextParam><TextParam>
• Disparage, tarnish, or otherwise harm, in our opinion, us, the Site, the Game, and/or the Contracts.
</TextParam><TextParam>
• Use the Site, the Game, the Content, the Marks, and the Contracts in any manner inconsistent with any applicable laws or regulations.
</TextParam><TextParam>
<strong>5. SUBMISSION</strong>
</TextParam><TextParam>
You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information regarding the Site, the Game and the Contracts (“Submissions") provided by you to us are non-confidential and should become our sole property. We should own exclusive rights, including all intellectual property rights, and should be entitled to the unrestricted use and dissemination of these Submissions to any lawful purpose, commercial, or otherwise, without acknowledgment or compensation for you. You hereby waive any moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there should be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.
</TextParam><TextParam>
<strong>6. THIRD-PARTY WEBSITE AND CONTENT</strong>
</TextParam><TextParam>
The Site and/or the Game (or you may be sent via the Site and/or the Game) may have links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site and/or the Game or any Third-Party Content posted on, available through, or installed from the Site and/or the Game including but not limited to the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and/or the Game and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk and you should be aware that the terms of Use do not in any way govern and we shall not be liable for any of your activities related to Third-Party Websites and Third-Party Content. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site and/or the Game or relating to any applications you use or install from the Site and/or the Game. Any purchase you make through Third-Party Websites shall be through other websites and from other entities, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products and services offered on Third-Party Websites; and shall hold us harmless from any harm caused by your purchase of such products and services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
</TextParam><TextParam>
<strong>7. ADVERTISER</strong>
</TextParam><TextParam>
We allow advertisers to display their advertisements and other information in certain areas of the Site and the Game such as sidebar advertisements or banner advertisements. If you are an advertiser, you should take full responsibility for any advertisements you place on the Site and/or the Game and any services provided on the Site and/or the Game and any products sold through those advertisements. Further, as an advertiser, you warrant and represent that you possess all rights and authority to place advertisements on the Site and/or the Game, including, but not limited to, intellectual property rights, publicity rights, property and contractual rights. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
</TextParam><TextParam>
<strong>8. TERMINATION</strong>
</TextParam><TextParam>
The Terms of Use remain in full force and effect while you use the Site, the Game and the Contracts. Without limiting any other provision of the Terms Of Use, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Site, the Game and the Contracts (including blocking certain IP addresses) to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in the Terms of Use or of any applicable law or regulation. We may terminate your use or participation in the Site, the Game, and the Contracts or delete your account without warning, in our sole discretion.
If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or a borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating and suspending your account, we reserve the right to take appropriate legal actions, including without limitation pursuing civil, criminal, and injunctive redress.
</TextParam><TextParam>
<strong>9. DISCLAIMER</strong>
</TextParam><TextParam>
<strong>• GENERAL CLAUSE</strong>
</TextParam><TextParam>
Please carefully review the Terms of Use before you continue to access the Site or the Game. Accessing the Site or the Game means that you agree to the Terms of Use set forth by us. The information we use on the Site is for reference purposes only unless otherwise stated by us and is subject to change without notice and should not be used as our advice for any person in any case. We may change and update these regulations at any time. Therefore, you must visit the Site regularly to get the latest information.
</TextParam><TextParam>
You understand and agree that we, our subsidiaries, affiliates, and licensors and other relevant persons and entities as updated from time by our policies shall not be liable to you or to any third party for any direct, indirect, incidental, special, consequential, or exemplary damage which you may incur, howsoever caused and under any theory of liability, including, without limitation, any loss of profits (whether incurred directly or indirectly), loss of goodwill or business reputation, loss of data, cost of procurement of substitute goods or services, or any other tangible or intangible loss, even if we have been advised of the possibility of such damage.
</TextParam><TextParam>
You hereby understand, agree and acknowledge that in any cases, we shall not be held liable for compensations or reimbursements to you for any and all claims arising out of or relating to the Terms of Use or your access to or use of (or your inability to access or use) any portion of the Site, the Game and the Contracts, whether in contract, tort, strict liability, or any other legal theory.
</TextParam><TextParam>
You hereby understand, agree and acknowledge that we have made the Site, the Game and the Contracts available to you and entered into the Terms of Use in reliance upon the warranty disclaimers and limitations of liability set forth herein, which reflect a reasonable and fair allocation of risk between the parties and form an essential basis of the bargain between us. We would not be able to provide the Site, the Game and the Contracts to you without these limitations.
</TextParam><TextParam>
<strong>• MARKET AND TOKEN MANAGEMENT</strong>
</TextParam><TextParam>
You expressly understand and agree that your access to and use of the Site, the Game, and the Contracts are at your own risk, and that the Site, the Game, and the Contracts are provided "as is" and "as available" without warranties of any kind, whether express or implied.
</TextParam><TextParam>
To the fullest extent permissible pursuant to applicable law, we, our subsidiaries, affiliates, agents, employees, and licensors make no express warranties and hereby disclaim all implied warranties regarding the Site, the Game and the Contracts and any part of it (including, without limitation, the Site, the Game, any Contract, or any external websites), including the implied warranties of merchantability, fitness for a particular purpose, non-infringement, correctness, accuracy, or reliability.
</TextParam><TextParam>
Without limiting the generality of the foregoing, we, our subsidiaries, affiliates, and licensors do not represent or warrant to you that: (i) your access to or use of the Site, the Game, and the Contracts shall meet your requirements, (ii) your access to or use of the Site, the Game, and the Contracts shall be uninterrupted, timely, secure or free from error, (iii) usage data provided through the Site, the Game, and the Contracts shall be accurate, (iii) the Site, the Game, and the Contracts or any content, services, or features made available on or through the Site, the Game and the Contracts are free of viruses or other harmful components, or (iv) that any data that you disclose when you use the Site, the Game and the Contracts shall be secure.
</TextParam><TextParam>
You fully acknowledge and accept the inherent security risks of providing information and dealing online over the internet and agree that we have no liability or responsibility for any breach of security by any party.
</TextParam><TextParam>
We shall not be responsible or liable to you for any losses you incur as the result of your use of the Ethereum network, and the Metamask electronic wallet including but not limited to any losses, damages or claims arising from: (a) user error, such as forgotten passwords or incorrectly construed smart contracts or other transactions; (b) server failure or data loss; (c) corrupted wallet files; (d) unauthorized access or activities by third parties, including but not limited to the use of viruses, phishing, brute forcing or other means of attack against Ethereum network, or the Metamask electronic wallet.
</TextParam><TextParam>
Cryptocurrencies are intangible digital assets that exist only by virtue of the ownership record maintained on the Binance network. All Contracts are conducted and occur on the decentralized ledger within the Binance network. We have no control over and make no guarantees or promises with respect to Contracts. We are not responsible for losses due to blockchains or any other features of the Ethereum network, Binance network, or the Metamask electronic wallet, including but not limited to late reports by developers or representatives (or no report at all) of any issues with the blockchain supporting the Ethereum network, Binance network, including forks, technical node issues, or any other issues having fund losses as a result.
</TextParam><TextParam>
<strong>• THIRD-PARTY LINKS AND WEBSITES</strong>
</TextParam><TextParam>
We hold no and shall not be responsible or liable in any way for the content of such other websites or media linked to the Site or the Game, including any products, services, and other items offered through such websites.
</TextParam><TextParam>
<strong>10. LIMITATION OF LIABILITY</strong>
</TextParam><TextParam>
You understand and agree that we, our subsidiaries, affiliates, service providers, employees, agents, and licensors shall not be liable to you or to any third party for any direct, indirect, incidental, special, consequential, or exemplary damages which you may incur, howsoever caused and under any theory of liability, including, without limitation, any loss of profits (whether incurred directly or indirectly), loss of goodwill or business reputation, loss of data, cost of procurement of substitute goods or services, or any other intangible loss, even if we have been advised of the possibility of such damages.
</TextParam><TextParam>
You agree and acknowledge that we have made the Site, the Game and the Contracts available to you and entered into the Terms of Use in reliance upon the warranty disclaimers and limitations of liability set forth herein, which reflect a reasonable and fair allocation of risk between the parties and form an essential basis of the bargain between us. We would not be able to provide the Site, the Game and the Contracts to you without these limitations.
</TextParam><TextParam>
<strong>11. ASSUMPTION OF RISK</strong>
</TextParam><TextParam>
You accept and acknowledge each of the following:
</TextParam><TextParam>
A. The prices of blockchain assets are extremely volatile. Fluctuations in the price of other digital assets could materially and adversely affect the value of your Products, which may also be subject to significant price volatility. We cannot guarantee that any purchasers of the Products shall not lose money.
</TextParam><TextParam>
B. You are solely responsible for determining what, if any, taxes apply to your Products-related transactionsWe are not responsible for determining the taxes that apply to your transactions on the Site, the Game, or the Contracts.
</TextParam><TextParam>
C. The Site does not store, send, or receive Products. This is because Products exist only by virtue of the ownership record maintained on the Game’s supporting blockchain on the Binance network. Any transfer of Product occurs only on the Binance network.
</TextParam><TextParam>
D. There are risks associated with using an Internet-based currency, including, but not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet. You accept and acknowledge that we shall not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Binance network, however caused.
</TextParam><TextParam>
E. A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of the the Site and Game’s ecosystem, and therefore the potential utility or value of the Products.
</TextParam><TextParam>
<strong>12. INDEMNIFICATION</strong>
</TextParam><TextParam>
You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, service providers and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by third party due to or arising out of: (1) use of the Site or the Game, (2) breach of the Terms of Use, (3) any breach of your representations and warranties set forth in the Terms of Use, (4) your violation of the rights of a third party, including but not limited to intellectual property rights, or (5) any overt harmful act toward any other user of the Site, the Game and the Contracts with whom you connected via the Site, the Game and the Contracts. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We shall use reasonable efforts to notify you of any such claim, action or proceeding, which is subject to this indemnification upon becoming aware of it.
</TextParam><TextParam>
<strong>13. USER DATA</strong>
</TextParam><TextParam>
We shall maintain certain data that you transmit to the Site, the Game and the Contracts for the purpose of managing the performance of the Site, the Game and the Contracts, as well as data relating to your use of the Site, the Game and the Contracts. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that release to any activity you have undertaken using the Site, the Game and the Contracts. It is assumed that you agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
</TextParam><TextParam>
<strong>14. MISCELLANEOUS</strong>
</TextParam><TextParam>
The Terms of Use and any policies or operating rules posted by us on the Site, the Game and the Contracts, or in respect to the Site, the Game and the Contracts constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of the Terms of Use shall not operate as a waiver of such right or provision. The Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of the Terms of Use is determined to be unlawful, void, and unenforceable, that provision or part of the provision is deemed severable from the Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of the Terms of Use or use of the Site or the Game. You agree that the Terms of Use shall not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of the Terms of Use and the lack of signing by the parties hereto to execute the Terms of Use.
</TextParam><TextParam>
<strong style={{paddingBottom: '50px'}}>Arcade © 2021 </strong>
          </TextParam>
        </div>
        <div className="scroll-fade" />
      </DialogContent>
      <DialogActions className="modal-dialog-action">
        <ThemeProvider theme={dialogTheme}>
          <Button className="modal-btn" variant="contained" color="primary" onClick={props.onClose}>
            Got it!
          </Button>
        </ThemeProvider>
      </DialogActions>
      <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default TermOfUse
