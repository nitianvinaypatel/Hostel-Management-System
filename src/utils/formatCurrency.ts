export const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
    }).format(amount)
}

export const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
}
