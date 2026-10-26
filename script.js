const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => { const open = header.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.site-header a').forEach(a => a.addEventListener('click', () => { header.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.08});
document.querySelectorAll('.studio-grid,.principles article,.project-card,.results-head,.results-total>div,.evidence-strip article,.event-ledger>* ,.drive-evidence article,.byn-business-title,.byn-now article,.byn-targets,.atlas-head,.atlas-grid article,.center>* ,.program-head,.program-flow article,.person,.impact-intro,.impact-numbers,.awards article,.timeline-list article,.media-head').forEach(el => { el.classList.add('reveal'); observer.observe(el); });

document.querySelectorAll('[data-lang-link]').forEach(link => link.addEventListener('click', event => {
  const destination = new URL(link.href, window.location.href);
  destination.hash = window.location.hash;
  event.preventDefault();
  window.location.href = destination.href;
}));

let activeProjectFilter = 'all';
const projectSearch = document.querySelector('#project-search');
const projectItems = [...document.querySelectorAll('.atlas-grid article')];
const projectEmpty = document.querySelector('.atlas-empty');
const applyProjectFilter = () => {
  const query = projectSearch.value.trim().toLocaleLowerCase('ru');
  let visibleCount = 0;
  projectItems.forEach(item => {
    const categories = item.dataset.project.split(' ');
    const matchesType = activeProjectFilter === 'all' || categories.includes(activeProjectFilter);
    const matchesQuery = !query || item.textContent.toLocaleLowerCase('ru').includes(query);
    const visible = matchesType && matchesQuery;
    item.classList.toggle('is-hidden', !visible);
    if (visible) visibleCount += 1;
  });
  projectEmpty.hidden = visibleCount !== 0;
};
document.querySelectorAll('.atlas-filters button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.atlas-filters button').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  activeProjectFilter = button.dataset.projectFilter;
  applyProjectFilter();
}));
projectSearch?.addEventListener('input', applyProjectFilter);

document.querySelectorAll('.timeline-controls button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.timeline-controls button').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.timeline-list article').forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.type !== filter));
}));

const railLinks = [...document.querySelectorAll('[data-rail]')];
const railProgress = document.querySelector('.rail-progress i');
let scrollQueued = false;
const updateScrollUI = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (railProgress) railProgress.style.height = `${maxScroll > 0 ? Math.min(100, window.scrollY / maxScroll * 100) : 0}%`;
  const marker = window.scrollY + window.innerHeight * .42;
  let activeId = 'top';
  railLinks.forEach(link => {
    const section = document.getElementById(link.dataset.rail);
    if (section && section.offsetTop <= marker) activeId = link.dataset.rail;
  });
  railLinks.forEach(link => link.classList.toggle('active', link.dataset.rail === activeId));
  scrollQueued = false;
};
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScrollUI); }
}, {passive:true});
updateScrollUI();

const language = document.documentElement.lang === 'ru' ? 'ru' : 'en';
const t = (ru, en) => language === 'ru' ? ru : en;
const canvaByn = 'https://www.canva.com/d/ypcN2Y3acA1Wtdk';
const canvaBorsyq = 'https://www.canva.com/d/ojfFDDI0XdaO8R2';
const canvaTrails = 'https://www.canva.com/d/7gBwq0ZrLDaK4WO';
const projectMaterials = {
  byn: { title:'By Your Name', kicker:'FLAGSHIP / GAME JAM → STEAM', url:'https://by-your-name.seeverse.workers.dev', summary:t('Нелинейный психологический триллер об исследовании проклятого особняка, чужих воспоминаниях и пяти формах героя. Проект вырос из джемовской идеи в самостоятельную игру SeeVerse Studio.','A nonlinear psychological thriller about a cursed mansion, borrowed memories and five playable forms. The project grew from a game-jam idea into a standalone SeeVerse Studio title.'), meta:['PC / STEAM','8 LANGUAGES','2027'], images:['assets/by-your-name-hero.png'], links:[['PRODUCT SITE','https://by-your-name.seeverse.workers.dev'],['STEAM','https://store.steampowered.com/app/5120660/By_Your_Name/?beta=0'],[t('ПИТЧДЕК В CANVA','CANVA PITCH DECK'),canvaByn]] },
  barys: { title:'Barys Bala', kicker:'DIGITAL / RELEASED', url:'https://barysbala.kz/', summary:t('Билингвальная обучающая игра 4+ с четырьмя типами заданий, казахской и русской озвучкой, персонажем-проводником и системой звёзд.','A bilingual educational game for ages 4+, with four activity types, Kazakh and Russian voice-over, a guide character and a star system.'), meta:['IOS / IPADOS','FAMILY','RELEASED'], images:['assets/projects/barys-bala.png'], links:[[t('САЙТ ПРОЕКТА','PROJECT SITE'),'https://barysbala.kz/'],['APP STORE','https://apps.apple.com/kz/app/barys-bala/id6758675184']] },
  deadland: { title:'Deadland Drifters', kicker:'BORSYQ GAMES / IP', summary:t('Выживание на автомобилях против зомби: интерактивный мир, системные обновления, разнообразное оружие и транспорт, кооперативный режим.','Vehicle survival against zombies, with an interactive world, systemic upgrades, varied weapons and vehicles, and co-op play.'), meta:['WEB → PC','SURVIVAL','CONCEPT'], images:['assets/projects/deadland-drifters.png','assets/canva/borsyq-10.png','assets/canva/borsyq-07.png'], links:[[t('ИСХОДНЫЙ ПИТЧДЕК','SOURCE PITCH DECK'),canvaBorsyq]] },
  phantom: { title:'Phantom Photo', kicker:'COLLAB / SERPENT’S EYE', summary:t('Мобильный horror-tour о журналисте и телефоне, который видит призраков. Совместная концепция Borsyq Games и Serpent’s Eye Studio.','A mobile horror tour about a journalist and a phone that can see ghosts, developed as a Borsyq Games × Serpent’s Eye Studio concept.'), meta:['MOBILE','HORROR TOUR','COLLAB'], images:['assets/projects/phantom-photo-01.jpg','assets/projects/phantom-photo-02.jpg','assets/projects/phantom-photo-03.jpg','assets/projects/phantom-photo-04.jpg'], links:[[t('ИСХОДНЫЙ ПИТЧДЕК','SOURCE PITCH DECK'),canvaBorsyq]] },
  steel: { title:'Steel Hoof', kicker:'BORSYQ GAMES / CONCEPT', summary:t('Мобильный 2D survival roguelike о боевой лошади, ордах оборотней и усиливающихся процедурных забегах.','A mobile 2D survival roguelike about a battle horse, werewolf hordes and escalating procedural runs.'), meta:['MOBILE','2D ROGUELIKE','CONCEPT'], images:['assets/projects/steel-hoof.png','assets/canva/borsyq-34.png','assets/canva/borsyq-18.png'], links:[[t('ИСХОДНЫЙ ПИТЧДЕК','SOURCE PITCH DECK'),canvaBorsyq]] },
  soulpet: { title:'SoulPet', kicker:'TRAILS / CURATED', summary:t('Эмоциональный тамагочи и дневник настроения: четыре ежедневных вопроса меняют характер и судьбу питомца.','An emotional tamagotchi and mood diary where four daily questions shape the pet’s character and fate.'), meta:['GODOT','ANDROID','PUBLISHING'], images:['assets/projects/soulpet.png'], links:[[t('TRAILS — РАБОЧИЙ ТРЕКЕР','TRAILS WORK TRACKER'),canvaTrails]] },
  ashline: { title:'Ashline', kicker:'TRAILS / TEAM PROJECT', summary:t('Раннер об огненном слайме в заброшенной шахте. Шермухаммед «Шерхан» Рахметов участвовал в команде как 3D-художник.','A runner about a fiery slime in an abandoned mine. Shermukhammad “Sherkhan” Rakhmetov contributed as the team’s 3D artist.'), meta:['UNITY','ANDROID','3D ART'], images:['assets/projects/ashline.png'], links:[[t('ПОРТФОЛИО ШЕРХАНА','SHERKHAN PORTFOLIO'),'https://shera-meow.github.io/portfolio/'],[t('TRAILS — РАБОЧИЙ ТРЕКЕР','TRAILS WORK TRACKER'),canvaTrails]] },
  rollacat: { title:'Roll a Cat', kicker:'TRAILS / TEAM PROJECT', url:'https://gamedevcenter.itch.io/roll-a-cat', summary:t('3D-платформер о коте-шаре, сладких полянах, врагах и восстановлении разрушенной кофейни.','A 3D platformer about a ball-shaped cat, candy meadows, enemies and rebuilding a ruined coffee shop.'), meta:['ANDROID','3D ARCADE','PROTOTYPE'], images:['assets/projects/roll-a-cat.png'], links:[['ITCH.IO','https://gamedevcenter.itch.io/roll-a-cat']] },
  pawzzle: { title:'Pawzzle', kicker:'TRAILS / TEAM PROJECT', summary:t('Классическая головоломка с передвижными плитками и возрастающей сложностью, доведённая до этапа публикации.','A classic sliding-tile puzzle with rising difficulty, taken through to the publishing stage.'), meta:['UNITY','ANDROID','PUBLISHED'], images:['assets/projects/pawzzle.png'], links:[[t('TRAILS — РАБОЧИЙ ТРЕКЕР','TRAILS WORK TRACKER'),canvaTrails]] },
  meomatch: { title:'Meo Match', kicker:'TRAILS / TEAM PROJECT', summary:t('Яркая match-3 игра о котиках. Матвей Сеселкин работал с командой как куратор и геймдизайнер.','A colorful cat-themed match-3. Matvey Seselkin worked with the team as curator and game designer.'), meta:['UNITY','ANDROID','GAME DESIGN'], images:['assets/projects/meo-match.jpg'], links:[[t('СКАЧАТЬ APK','DOWNLOAD APK'),'https://drive.google.com/file/d/1qKymym8NLmSFOnM9SuoPf8JnUesqdhaI/view'],[t('ПОРТФОЛИО МАТВЕЯ','MATVEY PORTFOLIO'),'https://github.com/MatveySA/Matvey_potfolio']] },
  krill: { title:'Krill Kill', kicker:'TRAILS / TEAM PROJECT', url:'https://gamedevcenter.itch.io/krill-kill', summary:t('Аркадный экшен-шутер о крошечной креветке с лазерной пушкой, прошедший внутреннее тестирование.','An arcade action shooter about a tiny shrimp with a laser cannon, taken through internal testing.'), meta:['GAMEMAKER','ANDROID','TESTING'], images:['assets/projects/krill-kill.png'], links:[['ITCH.IO','https://gamedevcenter.itch.io/krill-kill']] },
  broken: { title:'Broken', kicker:'TRAILS / TEAM PROJECT', summary:t('Платформер о выжившем космонавте на Луне; опубликован и продолжает дорабатываться командой.','A platformer about a surviving astronaut on the Moon; published and still being iterated by its team.'), meta:['GAMEMAKER','ANDROID','PUBLISHED'], images:['assets/projects/broken-01.jpg','assets/projects/broken-02.jpg','assets/projects/broken-03.jpg','assets/projects/broken-04.jpg'], links:[[t('СКАЧАТЬ APK','DOWNLOAD APK'),'https://drive.google.com/file/d/1bUZ_mlfPuz-Em38dLlRVb7MsM248NiT6/view'],[t('AAB ДЛЯ ПУБЛИКАЦИИ','PUBLISHING AAB'),'https://drive.google.com/file/d/14yQu42ZscXClEX2YyjUx4PmgP4XePL3M/view']] },
  deepdive: { title:'Deep Dive', kicker:'TRAILS / GAMEDEV CENTER', url:'https://gamedevcenter.itch.io/deep-dive', summary:t('Проект участника практики Trails, опубликованный в коллекции GameDev Center. Страница itch.io содержит актуальные материалы и сборку игры.','A Trails practice project published in the GameDev Center collection. Its itch.io page hosts the current game materials and build.'), meta:['TRAILS','ITCH.IO','PROJECT'], images:[], links:[['ITCH.IO','https://gamedevcenter.itch.io/deep-dive']] },
  linkbots: { title:'Link Bots: Escape', kicker:'TRAILS / TEAM 6', url:'https://linkbots.itch.io/link-bots-escape', summary:t('Командный проект Trails. Игровая страница опубликована командой Link Bots.','A Trails team project published by Team Link Bots.'), meta:['TRAILS','TEAM 6','ITCH.IO'], images:[], links:[['ITCH.IO','https://linkbots.itch.io/link-bots-escape']] },
  bulletfate: { title:'Bullet Fate', kicker:'TRAILS / TEAM 2', url:'https://archxra.itch.io/bullet-fate', summary:t('Командный проект Trails, опубликованный на itch.io участником команды.','A Trails team project published on itch.io by a member of the team.'), meta:['TRAILS','TEAM 2','ITCH.IO'], images:[], links:[['ITCH.IO','https://archxra.itch.io/bullet-fate']] },
  inoblivion: { title:'In Oblivion: Redemption v7', kicker:'TRAILS / TEAM 5', url:'https://dev5team.itch.io/in-oblivion-redemption-v7', summary:t('Командный проект Trails, опубликованный командой Dev5. Страница игры содержит версию Redemption v7.','A Trails team project published by Dev5 Team. The game page hosts the Redemption v7 release.'), meta:['TRAILS','TEAM 5','ITCH.IO'], images:[], links:[['ITCH.IO','https://dev5team.itch.io/in-oblivion-redemption-v7']] },
  slashnswarm: { title:'Slash ’n’ Swarm v5.0', kicker:'TRAILS / TEAM 4', url:'https://llerionore.itch.io/slashnswarm', summary:t('Командный проект Trails, опубликованный на itch.io. В коллекции GameDev Center указана версия 5.0.','A Trails team project published on itch.io. The GameDev Center collection lists version 5.0.'), meta:['TRAILS','TEAM 4','ITCH.IO'], images:[], links:[['ITCH.IO','https://llerionore.itch.io/slashnswarm']] },
  gamesmaking: { title:'Games making Games', kicker:'TRAILS / TEAM 1', url:'https://sagrade.itch.io/games-making-games', summary:t('Образовательная игра команды Trails, опубликованная на itch.io и включённая в коллекцию GameDev Center.','An educational Trails team game published on itch.io and included in the GameDev Center collection.'), meta:['TRAILS','TEAM 1','ITCH.IO'], images:[], links:[['ITCH.IO','https://sagrade.itch.io/games-making-games']] },
  astanavis: { title:'AstanaVis Bro', kicker:'TEAM HACKATHON PROJECT', url:'https://idosgames.com/app/1ZPS8DLV/?ref=KDNDDJWR', summary:t('Отдельная командная работа для хакатона, опубликованная как играбельный web-проект на iDos Games. Проект относится к джемовской деятельности команды, а не к курированию.','A standalone team hackathon build published as a playable web project on iDos Games. It belongs to the team’s jam work, not its curation activity.'), meta:['WEB','HACKATHON','PLAYABLE'], images:[], links:[[t('ИГРАТЬ НА IDOS','PLAY ON IDOS'),'https://idosgames.com/app/1ZPS8DLV/?ref=KDNDDJWR']] }
};

const projectModal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#project-modal-title');
const modalSummary = document.querySelector('#project-modal-summary');
const modalKicker = document.querySelector('#project-modal-kicker');
const modalMeta = document.querySelector('#project-modal-meta');
const modalLinks = document.querySelector('#project-modal-links');
const modalGallery = document.querySelector('#project-modal-gallery');
let modalReturnFocus = null;
const openProjectModal = (id, trigger) => {
  const data = projectMaterials[id];
  if (!data || !projectModal) return;
  modalReturnFocus = trigger;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalSummary.textContent = data.summary;
  modalMeta.innerHTML = data.meta.map(item => `<b>${item}</b>`).join('');
  modalLinks.innerHTML = data.links.map(([label,url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join('');
  modalGallery.innerHTML = data.images.length ? data.images.map((src,index) => `<button type="button" data-lightbox="${src}" data-caption="${data.title} — ${t('материал','material')} ${index+1}"><img src="${src}" alt="${data.title} — ${t('материал','material')} ${index+1}"></button>`).join('') : `<div class="project-modal-empty">${t('Визуальные материалы доступны по ссылкам проекта.','Visual materials are available through the project links.')}</div>`;
  projectModal.showModal();
};
document.querySelectorAll('.atlas-grid article[data-material]').forEach(card => {
  const data = projectMaterials[card.dataset.material];
  const trigger = card.querySelector('.project-trigger');
  if (!data || !trigger) return;
  const cover = document.createElement('div');
  cover.className = 'atlas-cover-slot';
  const coverImage = data.images[0];
  if (coverImage) {
    const img = document.createElement('img');
    img.className = 'atlas-cover'; img.src = coverImage; img.alt = `${data.title} cover`; img.loading = 'lazy';
    cover.append(img);
  } else {
    cover.classList.add('atlas-generated-cover', `cover-${card.dataset.material}`);
    const label = document.createElement('span'); label.textContent = data.kicker;
    const title = document.createElement('strong'); title.textContent = data.title;
    cover.append(label, title);
  }
  card.classList.add('has-cover');
  card.prepend(cover);
  if (data.url) {
    card.classList.add('has-project-url');
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    trigger.innerHTML = `${t('Открыть страницу','Open project page')} <i>↗</i>`;
    const openPage = () => window.open(data.url, '_blank', 'noopener,noreferrer');
    trigger.addEventListener('click', event => { event.stopPropagation(); openPage(); });
    card.addEventListener('click', event => { if (!event.target.closest('a,button,input')) openPage(); });
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPage(); } });
  } else {
    trigger.addEventListener('click', () => openProjectModal(card.dataset.material, trigger));
  }
});
document.querySelector('.project-modal-close')?.addEventListener('click', () => projectModal.close());
projectModal?.addEventListener('click', event => { if (event.target === projectModal) projectModal.close(); });
projectModal?.addEventListener('close', () => modalReturnFocus?.focus());

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
document.addEventListener('click', event => {
  const button = event.target.closest('[data-lightbox]');
  if (!button || !lightbox) return;
  lightboxImage.src = button.dataset.lightbox;
  lightboxImage.alt = button.dataset.caption || '';
  lightboxCaption.textContent = button.dataset.caption || '';
  lightbox.showModal();
});
document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

const teamPhotoGrid = document.querySelector('#team-photo-grid');
if (teamPhotoGrid) {
  const isRussian = document.documentElement.lang?.startsWith('ru');
  const localized = value => typeof value === 'string' ? value : (value?.[isRussian ? 'ru' : 'en'] || value?.en || '');
  const searchable = value => typeof value === 'string' ? value : Object.values(value || {}).join(' ');
  const normalizeSearch = value => value.toLocaleLowerCase().replace(/[\s_-]+/g, '');
  const assetUrl = path => path.split('/').map((part, index) => index ? encodeURIComponent(part) : part).join('/');
  const categoryNames = isRussian
    ? { events: 'Событие', education: 'Обучение', community: 'Сообщество', achievements: 'Достижение' }
    : { events: 'Event', education: 'Learning', community: 'Community', achievements: 'Achievement' };
  const searchInput = document.querySelector('#team-gallery-search');
  const filters = [...document.querySelectorAll('[data-gallery-filter]')];
  let activeFilter = 'all';
  let albumCards = [];
  let emptyMessage;
  const updateAlbums = () => {
    const query = normalizeSearch(searchInput?.value.trim() || '');
    let visible = 0;
    albumCards.forEach(({ element, category, searchText }) => {
      const show = (activeFilter === 'all' || activeFilter === category) && (!query || searchText.includes(query));
      element.hidden = !show;
      if (show) visible++;
    });
    if (emptyMessage) emptyMessage.hidden = visible > 0;
  };
  fetch(new URL('assets/team-albums.json?v=20261026-instagram-events', document.baseURI))
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Photo albums could not be loaded')))
    .then(({ albums = [] }) => {
      if (!Array.isArray(albums) || !albums.length) throw new Error('No photo albums found');
      teamPhotoGrid.replaceChildren();
      albums.forEach(album => {
        const details = document.createElement('details');
        details.className = 'team-album'; details.id = album.id; details.dataset.category = album.category;
        const summary = document.createElement('summary');
        const cover = document.createElement('img'); cover.className = 'team-album-cover'; cover.src = assetUrl(album.cover); cover.alt = ''; cover.loading = 'lazy';
        cover.addEventListener('error', () => { cover.hidden = true; details.classList.add('team-album-no-cover'); }, { once: true });
        const copy = document.createElement('span'); copy.className = 'team-album-copy';
        const category = document.createElement('small'); category.className = 'team-album-category'; category.textContent = categoryNames[album.category] || (isRussian ? 'Фотоархив' : 'Photo archive');
        const title = document.createElement('strong'); title.textContent = localized(album.title);
        const description = document.createElement('small'); description.className = 'team-album-description'; description.textContent = localized(album.summary);
        const count = album.groups.reduce((total, group) => total + group.files.length, 0);
        const videoCount = album.videos?.length || 0;
        const badge = document.createElement('span'); badge.className = 'team-album-count'; badge.textContent = count + ' ' + (isRussian ? 'фото' : 'photos') + (videoCount ? ' · ' + videoCount + ' ' + (isRussian ? 'видео' : 'videos') : '');
        copy.append(category, title, description); summary.append(cover, copy, badge); details.append(summary);
        album.groups.forEach(group => {
          const section = document.createElement('section'); section.className = 'team-album-year';
          const heading = document.createElement('h3'); heading.textContent = localized(group.label); section.append(heading);
          const grid = document.createElement('div'); grid.className = 'team-album-photos';
          group.files.forEach((path, index) => {
            const caption = localized(album.title) + ' · ' + localized(group.label) + ' · ' + (index + 1);
            const button = document.createElement('button'); button.type = 'button'; button.dataset.lightbox = assetUrl(path); button.dataset.caption = caption;
            const image = document.createElement('img'); image.src = assetUrl(path); image.alt = caption; image.loading = 'lazy';
            image.addEventListener('error', () => { button.classList.add('team-photo-missing'); button.disabled = true; button.removeAttribute('data-lightbox'); image.alt = isRussian ? 'Фото временно недоступно' : 'Photo temporarily unavailable'; }, { once: true });
            const label = document.createElement('span'); label.textContent = caption;
            button.append(image, label); grid.append(button);
          });
          section.append(grid); details.append(section);
        });
        if (album.videos?.length) {
          const mediaSection = document.createElement('section'); mediaSection.className = 'team-album-videos';
          const heading = document.createElement('div'); heading.className = 'team-album-media-heading';
          const mediaTitle = document.createElement('h3'); mediaTitle.textContent = isRussian ? 'Видео с события' : 'Event videos';
          const mediaNote = document.createElement('p'); mediaNote.textContent = isRussian ? 'Ролики и репортажи, связанные с этим альбомом.' : 'Clips and coverage connected to this album.';
          heading.append(mediaTitle, mediaNote); mediaSection.append(heading);
          const videoGrid = document.createElement('div'); videoGrid.className = 'team-video-grid';
          album.videos.forEach(video => {
            const card = document.createElement('article'); card.className = 'team-video-card team-video-' + video.type;
            const frame = document.createElement('div'); frame.className = 'team-video-frame';
            const iframe = document.createElement('iframe'); iframe.dataset.src = video.embedUrl; iframe.loading = 'lazy'; iframe.title = localized(video.title); iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'; iframe.allowFullscreen = true;
            if (video.type === 'instagram') iframe.scrolling = 'no';
            frame.append(iframe);
            const copy = document.createElement('div'); copy.className = 'team-video-copy';
            const source = document.createElement('span'); source.textContent = video.provider + (video.date ? ' · ' + video.date : '');
            const title = document.createElement('h4'); title.textContent = localized(video.title);
            const link = document.createElement('a'); link.href = video.url; link.target = '_blank'; link.rel = 'noreferrer'; link.textContent = isRussian ? 'Открыть источник ↗' : 'Open original ↗';
            copy.append(source, title, link); card.append(frame, copy); videoGrid.append(card);
          });
          mediaSection.append(videoGrid); details.append(mediaSection);
        }
        details.addEventListener('toggle', () => {
          if (details.open) {
            teamPhotoGrid.querySelectorAll('.team-album[open]').forEach(other => { if (other !== details) other.open = false; });
            details.querySelectorAll('iframe[data-src]').forEach(frame => { if (!frame.hasAttribute('src')) frame.src = frame.dataset.src; });
          } else {
            details.querySelectorAll('iframe[src]').forEach(frame => frame.removeAttribute('src'));
          }
        });
        teamPhotoGrid.append(details);
        const searchText = normalizeSearch([searchable(album.title), searchable(album.summary), ...album.groups.map(group => searchable(group.label)), ...(album.videos || []).flatMap(video => [searchable(video.title), video.provider, video.date, ...(video.keywords || [])])].join(' '));
        albumCards.push({ element: details, category: album.category, searchText });
      });
      emptyMessage = document.createElement('p'); emptyMessage.className = 'gallery-empty'; emptyMessage.hidden = true;
      emptyMessage.textContent = isRussian ? 'Альбомы не найдены. Измените фильтр или запрос.' : 'No albums found. Try another filter or search.';
      teamPhotoGrid.append(emptyMessage);
      filters.forEach(button => button.addEventListener('click', () => {
        activeFilter = button.dataset.galleryFilter;
        filters.forEach(option => { const active = option === button; option.classList.toggle('active', active); option.setAttribute('aria-pressed', String(active)); });
        updateAlbums();
      }));
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.galleryFilter === activeFilter)));
      searchInput?.addEventListener('input', updateAlbums);
      const target = document.getElementById(location.hash.slice(1));
      if (target?.matches('.team-album')) { target.open = true; requestAnimationFrame(() => target.scrollIntoView({ block: 'start' })); }
      updateAlbums();
    })
    .catch(() => {
      teamPhotoGrid.replaceChildren();
      const message = document.createElement('p'); message.className = 'gallery-loading gallery-error';
      message.textContent = isRussian ? 'Фотоальбомы сейчас не загрузились. Обновите страницу чуть позже.' : 'Photo albums could not be loaded. Please refresh the page in a moment.';
      teamPhotoGrid.append(message);
    });
}

