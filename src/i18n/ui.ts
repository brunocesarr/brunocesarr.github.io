export const languages = {
  'pt-br': 'Português',
  en: 'English',
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'meta.title': 'Bruno César — Developer',
    'meta.description':
      'Portfolio of Bruno César Silva, a developer based in Belo Horizonte, Brazil. Projects, experience and contact.',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.skip': 'Skip to content',
    'intro.greeting': 'Hi!',
    'intro.name': 'I am Bruno',
    'intro.tagline': 'Developer · Belo Horizonte, Brazil',
    'intro.motto': 'Live a life you will remember!',
    'about.heading': 'A little about me',
    'about.role': 'Developer',
    'about.photoAlt': 'Portrait of Bruno César Silva',
    'about.p1':
      'I believe in what Thomas Hobbes said: "Knowledge is power." Seeking out the new is an art. We are always building ourselves. I have seen and lived the journey, and how much it makes us better each time.',
    'about.p2':
      'For these reasons and others, I am a firm believer in the power of a smile.',
    'about.p3':
      'And that is how I chase my dreams — travelling to see the wonders this Earth offers. That feeling of peace is unique and calming. It lets us meet new cultures and people, and widens how we think.',
    'projects.heading': 'Projects',
    'projects.intro':
      'A selection of projects I have built or am currently building, all available on my GitHub.',
    'projects.noDescription': 'No description.',
    'projects.empty': 'Projects temporarily unavailable —',
    'projects.emptyLink': 'view on GitHub',
    'carousel.label': 'Projects',
    'carousel.slide': 'Page {n} of {total}',
    'carousel.prev': 'Previous projects',
    'carousel.next': 'Next projects',
    'carousel.goTo': 'Go to page {n}',
    'contact.heading': 'Contact',
    'footer.source': 'Source code',
    'lang.switch': 'View in Portuguese',
  },
  'pt-br': {
    'meta.title': 'Bruno César — Desenvolvedor',
    'meta.description':
      'Portfólio de Bruno César Silva, desenvolvedor em Belo Horizonte. Projetos, experiência e contato.',
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contatos',
    'nav.skip': 'Pular para o conteúdo',
    'intro.greeting': 'Olá!',
    'intro.name': 'Eu sou o Bruno',
    'intro.tagline': 'Desenvolvedor · Belo Horizonte',
    'intro.motto': 'Live a life you will remember!',
    'about.heading': 'Um pouco sobre mim',
    'about.role': 'Desenvolvedor',
    'about.photoAlt': 'Retrato de Bruno César Silva',
    'about.p1':
      'Sim. Acredito no pensamento de Thomas Hobbes: "Conhecimento é poder". A procura do novo é uma arte. Estamos a nos construir. Eu vi e vivencio como é a caminhada, e o quanto ela nos torna cada vez melhores.',
    'about.p2':
      'Por essas e por outras, eu sou grande crente no poder do sorriso no rosto.',
    'about.p3':
      'E é assim que busco meus sonhos. Poder viajar para conhecer as maravilhas que a Terra nos proporciona. Esse sentimento de paz é único e relaxante. Nos permite conhecer novas culturas e pessoas, expandindo nosso pensamento.',
    'projects.heading': 'Projetos',
    'projects.intro':
      'Estes são alguns projetos desenvolvidos ou em desenvolvimento que podem ser encontrados em meu GitHub.',
    'projects.noDescription': 'Sem descrição.',
    'projects.empty': 'Projetos temporariamente indisponíveis —',
    'projects.emptyLink': 'veja no GitHub',
    'carousel.label': 'Projetos',
    'carousel.slide': 'Página {n} de {total}',
    'carousel.prev': 'Projetos anteriores',
    'carousel.next': 'Próximos projetos',
    'carousel.goTo': 'Ir para a página {n}',
    'contact.heading': 'Contatos',
    'footer.source': 'Código deste site',
    'lang.switch': 'Ver em inglês',
  }
} as const;