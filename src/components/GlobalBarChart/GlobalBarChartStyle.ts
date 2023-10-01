import { StyleSheet } from "react-native";
import { palette, spacing } from "../../style";

export const BarChartStyle = StyleSheet.create({
    background: {
        width: '100%',
        backgroundColor: palette.white,
        padding: spacing.single,
        borderRadius: spacing.single,
        marginBottom: 80
    },
    container: {
        width: '100%',
        height: '100%',
        borderBottomWidth: 2,
        flexDirection: 'row',
        gap: spacing.singlehalf,
        alignItems: 'flex-end',
        paddingLeft: spacing.half
    },
    bar: {
        width: `${100 / 7 - 3.5}%`,
        backgroundColor: palette.primary,
    },
    barvaluecontainer: {
        position: 'absolute',
        top: -20,
        width: '100%',
        alignItems: 'center',
    },
    bardatacontainer: {
        position: 'absolute',
        width: 80,
    },
})