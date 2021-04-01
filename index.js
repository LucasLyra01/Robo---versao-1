const IQOption = require('./lib');
const { log, sleep } = require('./utils');
const readlineSync = require('readline-sync');

let direcao = null;

real_practice = "PRACTICE"

// var email_digitado = readlineSync.questionEMail('Digite o email: ')
// var senha_digitada = readlineSync.question("Digite a senha: ")

let logado = false;

const email_digitado = ""
const senha_digitada = ""

// var paridade = readlineSync.question('Digite o par: ')
// var paridade = paridade.toUpperCase();
const paridade = "EURUSD-OTC"

// var quantidade_velas = readlineSync.question('Digite a quantidade de velas que deseja buscar: ')
// var timeframe = readlineSync.question('Digite o timeframe: ');

const quantidade_velas = 5
const timeframe = 5


IQOption({
    email: email_digitado,
    password: senha_digitada
}).then(async API => {

    

    logado = true;

    console.log("Logado com sucesso");

    API.setBalance(real_practice);

    dados_conta = await API.getBalance(real_practice);
    moeda = dados_conta['currency'];
    valor_banca = dados_conta['amount']
    console.log(moeda, valor_banca);

    if (logado === true){

        operando(API)

    }

	/////////////////////// INFORMAÇÕES COM A VARIÁVEL "CONTA"

	// id: 333772308,
	// user_id: 68125942,
	// type: 1,
	// amount: 295.86,
	// enrolled_amount: 52.18,
	// enrolled_sum_amount: 52.18,
	// hold_amount: 0,
	// orders_amount: 0,
	// currency: 'BRL',
	// tournament_id: null,
	// tournament_name: null,
	// is_fiat: true,
	// is_marginal: false,
	// has_deposits: true,
	// auth_amount: 0,
	// equivalent: 0

	/////////////////////// INFORMAÇÕES COM A VARIÁVEL "CONTA"

}).catch(error =>{
    console.error(error);
})

async function operando(API){

    try {

        // id: 249293,
        // from: 1614900300,
        // at: 1614900324020556000,
        // to: 1614900600,
        // open: 1.19639,
        // close: 1.19653,
        // min: 1.19633,
        // max: 1.19653,
        // volume: 32

        var horario_abertura;
        
        var vetor_velas = [];
        vetor_velas = await API.getCandles(paridade, (timeframe * 60), quantidade_velas, Date.now());
        // console.log(vetor_velas[0]);

        for (let index = 0; index < quantidade_velas; index++) {
            
            horario_abertura = await vetor_velas[index]['from'];
            // console.log(index);

            var date = new Date(horario_abertura * 1000); 
            date = date.toLocaleTimeString();
            // console.log(date);

            preco_abertura = vetor_velas[index]['open']
            preco_fechamento = vetor_velas[index]['close']

            // console.log('abertura', preco_abertura, 'fechamento', preco_fechamento);

            if (preco_abertura < preco_fechamento){
                direcao = 'call';
            }

            if (preco_abertura > preco_fechamento){
                direcao = 'put';
            }

            console.log(date, direcao);
        }

        

    } catch (error) {
        console.error(error);
    }
    
}