export const displayMoney = (n) => {
    const numFormat = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return numFormat.format(n).split('.', 1);
};


export const calculateDiscount = (discountedPrice, originalPrice) => {
    const discountedPercent = (discountedPrice / originalPrice) * 100;

    return Math.round(discountedPercent);
};

export const calculateTotal = (arr) => {
    const total = arr.reduce((accum, val) => accum + val, 0);

    return total;
};