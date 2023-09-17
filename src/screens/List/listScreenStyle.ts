import { Text, StyleProp, ViewStyle } from "react-native"
import { palette, spacing } from "../../style"


export const FlatListItemStyle: StyleProp<ViewStyle>  = {
    padding: spacing.single,
    backgroundColor: palette.primary,
    marginVertical: spacing.single,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    borderRadius: spacing.single,
}