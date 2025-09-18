export const isGoodPassword = value => {
    //const regex = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,12}/;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    // el regex se asegura que tenga enter 6 y 12 caracteres, minimo un digito numerico, una letra minuscula y una letra mayuscula
    return regex.test(value)
}