export const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ')
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + '...' : str
}
