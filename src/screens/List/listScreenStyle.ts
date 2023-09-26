import { StyleProp, ViewStyle, TextStyle, Dimensions, StyleSheet } from "react-native"
import { palette, spacing } from "../../style"

const {width, height} = Dimensions.get('screen')

export const FlatListItemStyle: StyleProp<ViewStyle>  = {
    padding: spacing.single,
    backgroundColor: palette.primary,
    marginVertical: spacing.single,
    flexDirection: 'row',
    borderRadius: spacing.single,
}

export const ItemTextStyle: StyleProp<TextStyle> = {
    color: palette.white,
    width: '33%',
    textAlign: 'center',
}

export const DeleteSpendingModalStyle = StyleSheet.create({
    background: {
        backgroundColor: palette.transparentgray,
        width,
        height: height-100,
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    modal: {
        backgroundColor: palette.white,
        width: "75%",
        height: "20%",
        opacity: 1,
        padding: spacing.singlehalf,
        borderRadius: spacing.single
    },
    title: {
        color: palette.black,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    buttoncontainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around",
        gap: spacing.double,
        position: 'absolute',
        left: spacing.singlehalf,
        bottom: spacing.triple,
    },
    button: {
        padding: spacing.single,
        borderRadius: spacing.single,
        width: "30%",
        justifyContent: 'center',
        alignItems: "center"
    },
    buttontext: {
        fontWeight: '600',
        color: palette.white
    }
})