document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // LÓGICA DO CARROSSEL / SLIDER DE FOTOS
    // =========================================
    const track = document.querySelector('.carrossel-track');
    const btnPrev = document.querySelector('#btn-prev');
    const btnNext = document.querySelector('#btn-next');

    if (track && btnPrev && btnNext) {
        let index = 0;

        const obterInclinacaoCards = () => {
            const card = track.querySelector('.foto-item');
            if (!card) return 0;
            const cardWidth = card.getBoundingClientRect().width;
            const gap = 20; // Espaçamento entre os cards
            return cardWidth + gap;
        };

        const moverCarrossel = () => {
            const passo = obterInclinacaoCards();
            track.style.transform = `translateX(-${index * passo}px)`;
        };

        const totalItens = track.querySelectorAll('.foto-item').length;
        
        const obterVisiveis = () => {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            return 3;
        };

        btnNext.addEventListener('click', () => {
            const visiveis = obterVisiveis();
            if (index < totalItens - visiveis) {
                index++;
            } else {
                index = 0; // Volta para o início ao chegar no fim
            }
            moverCarrossel();
        });

        btnPrev.addEventListener('click', () => {
            const visiveis = obterVisiveis();
            if (index > 0) {
                index--;
            } else {
                index = totalItens - visiveis; // Vai para o final
            }
            moverCarrossel();
        });

        // Transição automática a cada 4 segundos
        let autoPlay = setInterval(() => {
            btnNext.click();
        }, 4000);

        // Pausa quando o usuário passa o mouse por cima
        const container = document.querySelector('.carrossel-container');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(autoPlay));
            container.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => {
                    btnNext.click();
                }, 4000);
            });
        }

        // Reajusta a posição se a janela for redimensionada
        window.addEventListener('resize', moverCarrossel);
    }
});