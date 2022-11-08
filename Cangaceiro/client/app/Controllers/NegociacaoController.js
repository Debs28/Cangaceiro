class NegociacaoController {
    constructor(){
        //	realizando	o	bind,	$	mantém	document	como	seu	contexto this
        const $ = document.querySelector.bind(document);

        //buscando os elementos
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        // Uso do proxy
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),  
            'adiciona', 'esvazia'                            
        );
        this._negociacoesView = new NegociacoesView('#negociacoes');
        this._negociacoesView.update(this._negociacoes);
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),  
            'texto'
           
        );


        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);
    }
   
    adiciona(event){
        try{
        //cancelando a submissão de formulário
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao()); //modificaçãos
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
       
        } catch(err){
            console.log(err);
            console.log(err.stack);
            if (err instanceof DataInvalidaException){
                this._mensagem.texto = err.message;
                
            }else{
                this._mensagem.texto = 'Um erro não esperado acontece u. Entre em contato com o suporte';
            }
        }
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value  = 0.0;
        this._inputData.focus();
    }

    _criaNegociacao() {
        // retorna a instância de negociação
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    apaga(){
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        
    }


}