try{
        const slides = document.querySelectorAll(".hero-slide");
        const delai = 5000;
        
            if(slides.length > 1 ){
            let courante = 0;
            setInterval(() =>{
                slides[courante].classList.remove("active");
                courante = (courante +1) % slides.length;
                slides[courante].classList.add("active");
            }, delai);
        }
    } catch (erreur){
        console.error("erreur carrousel : ", erreur);
    }
