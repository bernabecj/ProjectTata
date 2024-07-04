import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const COLORS = {
  grey: "#BFBFBF",
  grey2: "#A0A0A0",

  yellow: "#D3D000",
  kindWhite: "#C5C5C5",

  buttons: "#ff8c52",

  CardComment: '#86939e',
  cardbackground: "white",

  statusbar: "#ff8c52",
  heaherText: "white",
  lightgreen: '#66DF48',

  blue: '#286ef0',
  black: "#000000",
  white: "#ffffff",

  red: "#ff0000",
  green: "green",

  darkBlue: "#2d328a",
  pageBackground: "#F8F9FA",
  navBarColor: "#000000",

  inputBorder: "#e8e8e8",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const statusBarHeight = getStatusBarHeight()


const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  statusBarHeight: statusBarHeight,
  headerHeight: 45,

  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,

  headerPlusStatusHeight: statusBarHeight + 45
};


const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
