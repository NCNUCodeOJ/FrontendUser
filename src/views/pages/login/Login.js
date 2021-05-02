import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, CssBaseline, Link,
  Paper, Box, Grid, Typography, Dialog,
  Backdrop, CircularProgress, TextField
} from '@material-ui/core/';
import {
  AccountCircle, Lock
} from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert, AlertTitle } from '@material-ui/lab';
import { getUserInfo } from '../../../api/page/api';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    height: '100vh',
  },
  droot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textArea: {
    marginRight: '20px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    fontSize: 14,
  },
  cardTitle: {
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.droot} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        NCNU IM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignInSide = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLogin = useSelector(state => state.isLogin);
  const handlePrivacyOpen = () => setPrivacyOpen(true);
  const handlePrivacyClose = () => setPrivacyOpen(false);
  const handleTermOpen = () => setTermOpen(true);
  const handleTermClose = () => setTermOpen(false);
  const privacyPolicys = [
    {
      key: "privacy1",
      title: "一、隱私權保護政策的適用範圍",
      content: `隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。
      隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。 `
    },
    {
      key: "privacy2",
      title: "二、個人資料的蒐集、處理及利用方式",
      content: `當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，
      並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
      本網站在您使用互動性功能時，會保留您所提供的資訊等。 於一般瀏覽時，伺服器會自行記錄相關行徑，
      包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，
      做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。 `
    },
    {
      key: "privacy3",
      title: "三、資料之保護",
      content: `本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，
      加以保護網站及您的個人資料採用嚴格的保護措施， 只由經過授權的人員才能接觸您的個人資料，
      如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。`
    },
    {
      key: "privacy4",
      title: "四、網站對外的相關連結",
      content: ` 本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。
      但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。 `
    },
    {
      key: "privacy5",
      title: "五、與第三人共用個人資料之政策",
      content: `本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業，但有法律依據或合約義務者，不在此限。 前項但書之情形包括但不限於：
      A. 經由您書面同意。
      B. 為免除您生命、身體、自由或財產上之危險。
      C. 當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害。
      D. 有利於您的權益。
      E. 本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。 `
    },
    {
      key: "privacy6",
      title: "六、Cookie之使用",
      content: `為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie， 若您不願接受Cookie的寫入，
      您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導至網站某些功能無法正常執行 。 `
    },
    {
      key: "privacy7",
      title: "七、隱私權保護政策之修正",
      content: ` 本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。`
    },
  ];
  const termPolicys = [
    {
      key: "term1",
      title: "一、接受條款",
      content: `國立暨南國際大學教學輔助系統（以下簡稱本網站） 當您申請使用，即表示您已閱讀並同意本網站條款之所有內容。
      本網站有權於任何時間修改或變更入會條款之內容，建議您隨時注意該修改或變更。`
    },
    {
      key: "term2",
      title: "二、本網站宗旨",
      content: `建立一完整系統提供教師以下服務:
      (1) 登記開放授課時間
      (2) 開放授課時間查詢與簽到
      (3) 填寫規定之表格`
    },
    {
      key: "term3",
      title: "三、您的義務 ",
      content: `(1) 依註冊頁面之提示提供您本人正確、最新及完整的資料。
      (2) 請隨時維持並更新您的個人資料，確保其為最新、最正確資料。`
    },
    {
      key: "term4",
      title: "四、資料之保護 ",
      content: ` 您同意本網站將您所提供的個人資料儲存與本網站之資料庫中，並受到本網站隱私權規範保障，
      本網站不會向任何人出售或出借你的個人識別資料， 若本網站因遭駭客入侵等不可抗力之情形造成資料遺失或外流，
      本網站開發人員將不必負任何法律責任。 為了保護使用者個人隱私， 我們無法為您查詢其他使用者的帳號資料，
      請您見諒！若您有相關法律上問題需查閱他人資料時，請務必向警政單位提出告訴，
      我們將全力配合警政單位調查並提供所有相關資料。 對於您所提供及留存之個人資料，本網站在未獲得您同意以前，
      絕不對外揭露您依法受保護之個人資料。以下幾種特殊情況不受此限：
      (1) 基於法律之規定。
      (2) 後司法機關或其他有權機關基於法定程序之要求。
      (3) 為保障本網站之財產及權益。
      (4) 再緊急情況下未維護其他會員或第三人之人身安全。
      (5) 其他本網站有正當理由認為需揭露個人資料之情形。`
    },
    {
      key: "term5",
      title: "五、保管義務",
      content: `您有責任帳號的機密安全。您必須完全負起因利用該帳號所進行之一切行動之責任。
      若您帳號遭到未經授權之使用，或發生其他任何安全問題時，您必須立即通知本網站，每次您連線完畢，
      請記得登出結束您的帳號使用。 因您未遵守本項約定所生之任何損失或損害，本網站將無法亦不予負責。`
    },
    {
      key: "term6",
      title: "六、與第三人網站的連結",
      content: `本網站或協力廠商可能會提供連結至其他網站。您可能會因此連結至其他業者經營的網站，但不表示本網站與該等業者有任何關係。`
    },
    {
      key: "term7",
      title: "七、其他特殊事項",
      content: `您同意於本網站所發表之一切內容僅代表您個人立場與行為，並同意承擔所有相關衍生之責任，本網站不負任何責任。`
    },
    {
      key: "term8",
      title: "八、其他",
      content: `其他未盡事項，皆依中華民國法律規定及網際網路規範辦理。 `
    },
  ];
  useEffect(() => {
    let isSubscribed = true
    setLoading(true);
    getUserInfo()
      .then(function (response) {
        const data = response.data;
        if (!isLogin && !data.user.is_anonymous) {
          toast.info('登入成功', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          });
        }
        if (isSubscribed) {
          dispatch({ type: 'set', username: data.user.name });
          dispatch({ type: 'set', isLogin: !data.user.is_anonymous });
          if (isLogin) {
            dispatch({ type: 'set', isAdmin: data.user.admin });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error('登入失敗', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }).finally(function () {
        if (isSubscribed) {
          setLoading(false);
        }
      })
    return () => isSubscribed = false
  }, [isLogin, dispatch])
  if (isLogin) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog onClose={handlePrivacyClose} aria-labelledby="privacy-title" open={privacyOpen}>
        <DialogTitle id="privacy-title" onClose={handlePrivacyClose}>
          隱私權政策
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            非常歡迎您光臨「國立暨南國際大學教學輔助系統」（以下簡稱本網站），
            為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，
            以保障您的權益，請您詳閱下列內容：
          </Typography>
          {
            privacyPolicys.map((privacyPolicy) => (
              <div key={privacyPolicy.key}>
                <Typography gutterBottom variant="h6">
                  {privacyPolicy.title}
                </Typography>
                <Typography gutterBottom>
                  {privacyPolicy.content}
                </Typography>
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrivacyClose} color="primary">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleTermOpen} aria-labelledby="terms-title" open={termOpen}>
        <DialogTitle id="terms-title" onClose={handleTermOpen}>
          服務條款
        </DialogTitle>
        <DialogContent dividers>
          {
            termPolicys.map((privacyPolicy) => (
              <div key={privacyPolicy.key}>
                <Typography gutterBottom variant="h6">
                  {privacyPolicy.title}
                </Typography>
                <Typography gutterBottom>
                  {privacyPolicy.content}
                </Typography>
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermClose} color="primary">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={3} md={5} className={classes.image} />
        <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              登入
            </Typography>
            <form className={classes.form} noValidate>
              <Alert severity="info">
                <AlertTitle>請注意</AlertTitle>
                當你登入時，即代表你同意本網站的《
                  <Button color="primary" onClick={handlePrivacyOpen}>
                  隱私權政策
                  </Button>
                  》與《
                  <Button color="primary" onClick={handleTermOpen}>
                  服務條款
                  </Button>》
                  <br />
                  你只能使用sXXXXXXXXX@mail1.ncnu.edu.tw的google帳號登入
              </Alert>
              <Grid container className={classes.textArea} alignItems="flex-end">
                <Grid item xs={1} sm={1} md={1} >
                  <AccountCircle />
                </Grid>
                <Grid item xs={4} sm={6} md={6} >
                  <TextField id="standard-basic" label="Username" placeholder="Tom" required />
                </Grid>
              </Grid>
              <Grid container className={classes.textArea} alignItems="flex-end">
                <Grid item xs={1} sm={1} md={1} >
                  < Lock />
                </Grid>
                <Grid item xs={4} sm={6} md={6} >
                  <TextField id="standard-basic" label="Password" placeholder="Password" required />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                href="http://localhost:8000/accounts/login/"
                className={classes.submit}
              >
                登入
              </Button>
              <Button
                variant="contained"
                href="#forgetPassword"
              >
                忘記密碼
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default SignInSide;
