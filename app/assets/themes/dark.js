let Colors = require('material-ui/lib/styles/colors')
let ColorManipulator = require('material-ui/lib/utils/color-manipulator')
let Spacing = require('material-ui/lib/styles/spacing')

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.redA400,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    // primary3Color: '#111',
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey800,
    // accent3Color: Colors.grey900,
    accent3Color: 'rgba(255,255,255,0.4)',
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  }
};
