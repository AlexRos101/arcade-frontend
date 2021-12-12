import React, { useRef } from 'react'
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

const PrivacyPolicy: React.FC<Props> = (props) => {
  const domRef = useRef<any>()

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
        <RowLabel>Privacy Policy</RowLabel>
      </DialogTitle>
      <DialogContent className="modal-dialog-content scroll-content" dividers>
        <div>
          <TextParam>
 
 Thank you for taking the time to visit ArcadeToken.games. Arcade is a platform offering games, with crytpocurrency as the utility for operations, on Binance Smart Chain. This website acts as the platform to use the Arcade services and play the hosted games. Arcade is developed and maintained by an international team, located in Australia, China, Singapore and the Philippines. This privacy policy informs you of how we collect and use your information.
 </TextParam><TextParam>
 The term “Personal Information” in this privacy policy means any information from which your identity is apparent or can be reasonably ascertained. We will only collect personal information when you expressly give us permission, such as submitting your email in an online signup form.
 </TextParam><TextParam>
 <strong>Scope</strong>
 </TextParam><TextParam>
 The purpose of this online service is to provide you with trusted information about the use of your information in using our services and website.
 </TextParam><TextParam>
 <strong>Personal information</strong>
 </TextParam><TextParam>
 By using our services, you agree to let us collect your Personal Information that you nominate and any other identifying information you provide, such as your name. We use this information in order to communicate with you and confirm your identity when using our services.
 </TextParam><TextParam>
 We will collect your Binance Smart Chain wallet address when you voluntarily provide it in using our services, in order to enable features on our website, such as play to earn and NFT purchases.
 </TextParam><TextParam>
 We also require your email address for the purpose of confirming your identity and ensuring that you, the user, are an authentic person. We only use your Personal Information for the purposes of providing you with our services and don’t share or sell any of your information with third parties. You can unsubscribe from our services at any time by contacting us.
 </TextParam><TextParam>
 The services offered by this website have been created for adults who can make their own qualified financial decisions. As such, we do not intentionally provide our services to minors under the age of 13.
 </TextParam><TextParam>
 <strong>How we deal with complaints and requests</strong>
 </TextParam><TextParam>
 You may request access to Personal Information about you that we hold and you may ask us to correct your Personal Information if you find that it is not accurate, up-to-date or complete. You may also make a complaint about our handling of your Personal Information. If we are unable to meet your requests, we will permanently delete your Personal Information from our records.
 </TextParam><TextParam>
 You can contact us by email, or send your request or complaint to the postal address below. We undertake to respond within 30 days. If the request or complaint will take longer to resolve, we will provide you with a date by which we expect to respond.
 </TextParam><TextParam>
 <strong>How we protect your Personal Information</strong>
 </TextParam><TextParam>
 This website is hosted on Amazon Web Services (AWS) servers, which reside across the globe. AWS provides protective services to ensure the safety of their servers as well as the data stored.
 </TextParam><TextParam>
 To further help protect the privacy of data and personal information we collect and hold, we maintain a number of technical and administrative safeguards. We update our website and test our security technology on a regular basis.
 </TextParam><TextParam>
 <strong>Website analytics</strong>
 </TextParam><TextParam>
 To ensure a smooth experience on our website, we use ‘cookies’. Cookies are a standard feature of most web sites. A cookie is a text file that our site may place on your computer in order to help remember your preferences when visiting our site. When you first visit our site, you will be given the option to not have cookies saved on your computer. You can also choose to refuse the use of cookies by adjusting the settings on your browser, however this may impact your experience on our site.
 </TextParam><TextParam>
 Our website contains links to websites operated by third parties unrelated to our services. Please be aware that our privacy policy does not cover the privacy practices of these other parties.
 </TextParam><TextParam>
 Our website uses Google Analytics, a service which transmits website traffic data to Google servers in the United States. Google Analytics does not identify individual users or associate your IP address with any other data held by Google. We use reports provided by Google Analytics to help us understand website traffic and web page usage.
 </TextParam><TextParam>
 By using this website, you consent to the processing of data about you by Google in the manner described in Google’s Privacy Policy (external site) and for the purposes set out above. You can opt out of Google Analytics if you disable or refuse the cookie, disable JavaScript, or use the opt-out service provided by Google (external site).
 </TextParam><TextParam>
 We also use interfaces with social media sites such as Facebook, LinkedIn, Twitter and others. If you choose to “like” or “share” information from this website through these services, you should review the privacy policy of that service. If you are a member of a social media site, the interface may allow the social media site to connect your visits to this site with other Personal Information.
 </TextParam><TextParam>
 <strong>Contact us</strong>
 </TextParam><TextParam>
 <span ref={domRef} style={{paddingBottom: '50px'}}>
   You can contact us via <a href={`mailto:admin@arcadetoken.finance`}>admin@arcadetoken.finance</a> if you have any concerns about your privacy on our website.
 </span>
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

export default PrivacyPolicy
