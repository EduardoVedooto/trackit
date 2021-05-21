export default function CalculatePercentage(habits) {
    return (Math.round((habits.reduce((sum, habit) => habit.done ? sum += 1 : sum, 0)/habits.length)*100));
}

/*                              Explicação da função
 *  Primeiramente é utilizado reduce para somar quantos hábitos estão com done true. Após
 *  isso, é dividido este número pelo total de hábitos, resultando na porcentagem. Para
 *  finalizar, é multiplicado por 100 para se chegar no número inteiro da porcentagem e
 *  utilizado a biblioteca Math para fazer o arredondamento do número.
 */