const unit=8;
export const spacing = {
    half: unit/2,
    single: unit,
    double: unit*2,
    triple: unit*3,
    quadruple: unit*4,
}

export const palette = {
    // primary: '#21988E',
    primary: '#20A090',
    black: "#000000",
    white: "#ffffff",
    gray: "#9E9FA5"
}

export const InputStyle = {
    borderRadius: spacing.single,
    // borderColor: palette.primary,
    borderColor: palette.black,
    borderWidth: 2,
    padding: spacing.single,
}

export const TitleStyle = {
    color: palette.primary,
    fontSize: 16,
    textAlign: 'center'
}