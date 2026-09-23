// Aguarda o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", () => {
    
    // Função que faz a animação dos números
    const animarContadores = () => {
        const contadores = document.querySelectorAll('.numero-contador');
        const velocidade = 80; // Quanto menor, mais rápida é a contagem

        contadores.forEach(contador => {
            const atualizarNumero = () => {
                const alvo = +contador.getAttribute('data-alvo');
                const numeroAtual = +contador.innerText.replace('+', '').replace('%', '');
                const incremento = Math.ceil(alvo / velocidade);

                if (numeroAtual < alvo) {
                    const proximoNumero = numeroAtual + incremento;
                    contador.innerText = (proximoNumero > alvo ? alvo : proximoNumero);
                    setTimeout(atualizarNumero, 30);
                } else {
                    // Adiciona os sufixos após terminar a contagem
                    if (contador.getAttribute('data-sufixo')) {
                        contador.innerText = contador.getAttribute('data-sufixo') + alvo;
                    } else {
                        contador.innerText = '+' + alvo;
                    }
                }
            };

            atualizarNumero();
        });
    };

    // Usa o IntersectionObserver para disparar a animação APENAS quando o usuário rolar até a seção
    const secaoImpacto = document.querySelector('#impacto');
    if (secaoImpacto) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animarContadores();
                observer.disconnect(); // Roda a animação apenas uma vez
            }
        }, { threshold: 0.5 }); // Dispara quando 50% da seção estiver visível

        observer.observe(secaoImpacto);
    }
});