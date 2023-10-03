import { StyleSheet, StyleProp, Dimensions, TextStyle, ViewStyle } from "react-native";
const {width, height} = Dimensions.get('screen')

const unit=8;
export const spacing = {
    half: unit/2,
    single: unit,
    singlehalf: unit*1.5,
    double: unit*2,
    triple: unit*3,
    quadruple: unit*4,
}

export const palette = {
    // primary: '#21988E',
    primary: '#20A090',
    red: "#A02030",
    black: "#000000",
    white: "#ffffff",
    gray: "#9E9FA5",
    transparentgray: "#9D9EA4D3"
}

export const InputStyle = {
    borderRadius: spacing.single,
    // borderColor: palette.primary,
    borderColor: palette.black,
    borderWidth: 1,
    padding: spacing.single,
}

export const TitleStyle: StyleProp<TextStyle> = {
    textAlign: 'center',
    color: palette.primary,
    fontSize: 20
}

export const Container: StyleProp<ViewStyle> = {
    padding: spacing.double
}

export const ButtonStyle = StyleSheet.create({
    buttom: {
        backgroundColor: palette.primary,
        borderRadius: spacing.single,
        margin: spacing.double,
        alignSelf: 'center',
    },
    text: {
        color: palette.white,
        paddingVertical: spacing.single,
        paddingHorizontal: spacing.triple,
        fontSize: 16,
        fontWeight: '500',
    }
})