import { Text, StyleProp, ViewStyle, TextStyle } from "react-native"
import { palette, spacing } from "../../style"


export const FlatListItemStyle: StyleProp<ViewStyle>  = {
    padding: spacing.single,
    backgroundColor: palette.primary,
    marginVertical: spacing.single,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // justifyContent: 'center',
    width: 300,
    borderRadius: spacing.single,
}

export const ItemTextStyle: StyleProp<TextStyle> = {
    color: palette.white,
    width: '33%',
    textAlign: 'center',
}