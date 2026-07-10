(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{#e=new Map;subscribe(e,t){return this.#e.has(e)||this.#e.set(e,new Set),this.#e.get(e).add(t),()=>this.unsubscribe(e,t)}unsubscribe(e,t){let n=this.#e.get(e);n&&(n.delete(t),n.size===0&&this.#e.delete(e))}publish(e,t={}){let n=this.#e.get(e);n&&n.forEach(e=>e(t))}clear(){this.#e.clear()}},t={debug:10,info:20,warn:30,error:40,silent:50},n=200,r=class{#e=[];constructor({namespace:e=`App`,level:t=`info`}={}){this.namespace=e,this.level=t}debug(e,t){this.#t(`debug`,e,t)}info(e,t){this.#t(`info`,e,t)}warn(e,t){this.#t(`warn`,e,t)}error(e,t){this.#t(`error`,e,t)}getEntries(){return[...this.#e]}#t(e,n,r){if(this.#n(e,n,r),t[e]<t[this.level])return;let i=r?[r]:[],a=`[${this.namespace}] ${n}`;if(e===`warn`){console.warn(a,...i);return}if(e===`error`){console.error(a,...i);return}console[e](a,...i)}#n(e,t,r){this.#e.push({timestamp:new Date().toISOString(),level:e,namespace:this.namespace,message:t,context:r??null}),this.#e.length>n&&this.#e.shift()}},i=class{constructor({storage:e,storeName:t}){if(!e)throw Error(`Repository storage dependency is required.`);if(!t)throw Error(`Repository storeName is required.`);this.storage=e,this.storeName=t}async getAll(){return this.storage.getAll(this.storeName)}async getById(e){return this.storage.getById(this.storeName,e)}async save(e){return this.storage.put(this.storeName,e)}async delete(e){return this.storage.delete(this.storeName,e)}},a=class extends i{async add(e){return this.storage.add(this.storeName,e)}async save(e){return this.storage.put(this.storeName,e)}async saveMany(e){return this.storage.bulkPut(this.storeName,e)}async exists(e){return this.storage.exists(this.storeName,e)}async count(e){return this.storage.count(this.storeName,e)}async clear(){return this.storage.clear(this.storeName)}async getByIndex(e,t){return this.storage.getByIndex(this.storeName,e,t)}async findByIndex(e,t={}){return this.storage.getAllByIndex(this.storeName,e,t)}async query(e={}){return this.storage.query(this.storeName,e)}async transaction(e,t){return this.storage.transaction([this.storeName],e,({getStore:e,transaction:n})=>t({store:e(this.storeName),transaction:n}))}},o=class{#e=new Map;constructor({storage:e}){this.storage=e}getRepository(e){return this.#e.has(e)||this.#e.set(e,new a({storage:this.storage,storeName:e})),this.#e.get(e)}clearCache(){this.#e.clear()}},s=`hwp-platform-3`,c=Object.freeze({metadata:`__storage_metadata`,migrations:`__storage_migrations`}),l=Object.freeze([{name:c.metadata,keyPath:`key`,indexes:[{name:`updatedAt`,keyPath:`updatedAt`}]},{name:c.migrations,keyPath:`id`,indexes:[{name:`version`,keyPath:`version`},{name:`completedAt`,keyPath:`completedAt`}]}]),u=Object.freeze({meals:`meals`,weights:`weights`,bodyMeasurements:`body_measurements`,medicationApplications:`tirzepatide_doses`,dailyHabits:`daily_habits`,foods:`foods`,settings:`settings`,favoriteMeals:`favorite_meals`,mealPlans:`meal_plans`}),d=Object.freeze([{name:u.meals,keyPath:`id`,indexes:[{name:`mealDate`,keyPath:`mealDate`},{name:`mealType`,keyPath:`mealType`},{name:`updatedAt`,keyPath:`updatedAt`}]},{name:u.weights,keyPath:`id`,indexes:[{name:`recordedAt`,keyPath:`recordedAt`},{name:`updatedAt`,keyPath:`updatedAt`}]},{name:u.bodyMeasurements,keyPath:`id`,indexes:[{name:`recordedAt`,keyPath:`recordedAt`},{name:`updatedAt`,keyPath:`updatedAt`}]},{name:u.medicationApplications,keyPath:`id`,indexes:[{name:`administeredAt`,keyPath:`administeredAt`},{name:`updatedAt`,keyPath:`updatedAt`}]},{name:u.settings,keyPath:`id`,indexes:[{name:`updatedAt`,keyPath:`updatedAt`}]}]),f=Object.freeze([{name:u.dailyHabits,keyPath:`id`,indexes:[{name:`date`,keyPath:`date`},{name:`updatedAt`,keyPath:`updatedAt`}]}]),ee=Object.freeze([{name:u.foods,keyPath:`id`,indexes:[{name:`name`,keyPath:`name`},{name:`category`,keyPath:`category`},{name:`updatedAt`,keyPath:`updatedAt`}]}]),p=Object.freeze([{name:u.favoriteMeals,keyPath:`id`,indexes:[{name:`name`,keyPath:`name`},{name:`category`,keyPath:`category`},{name:`updatedAt`,keyPath:`updatedAt`}]}]),m=Object.freeze([{name:u.mealPlans,keyPath:`id`,indexes:[{name:`name`,keyPath:`name`},{name:`updatedAt`,keyPath:`updatedAt`}]}]),h=Object.freeze({databaseName:s,version:6,stores:[...l,...d,...f,...ee,...p,...m]}),te=`hwp-platform-3.indexeddb.backup`,ne=class{constructor({storage:e,databaseName:t,version:n}){this.storage=e,this.databaseName=t,this.version=n}async exportJson({includeSystemStores:e=!1}={}){let t=await this.#e(e),n={};return await Promise.all(t.map(async e=>{n[e]=await this.storage.getAll(e)})),JSON.stringify({format:te,databaseName:this.databaseName,version:this.version,exportedAt:new Date().toISOString(),stores:n},null,2)}async importJson(e,{clearBeforeImport:t=!0}={}){let n=this.#t(e),r=Object.keys(n.stores),i=await this.storage.getStoreNames(),a=r.filter(e=>!i.includes(e));if(a.length>0)throw Error(`Backup contains unknown object stores: ${a.join(`, `)}.`);return r.length===0?{importedStores:[],importedAt:new Date().toISOString()}:(await this.storage.transaction(r,`readwrite`,({getStore:e})=>{r.forEach(r=>{let i=e(r);t&&i.clear(),n.stores[r].forEach(e=>i.put(e))})}),{importedStores:r,importedAt:new Date().toISOString()})}async#e(e){let t=await this.storage.getStoreNames();return e?t:t.filter(e=>e!==c.metadata&&e!==c.migrations)}#t(e){let t=typeof e==`string`?JSON.parse(e):e;if(t.format!==te)throw Error(`Unsupported backup format.`);if(!t.stores||typeof t.stores!=`object`)throw Error(`Backup does not contain stores.`);return Object.entries(t.stores).forEach(([e,t])=>{if(!Array.isArray(t))throw Error(`Backup store "${e}" must contain an array of records.`)}),t}},re=class{constructor({version:e,migrations:t}){this.version=e,this.migrations=[...t].sort((e,t)=>e.version-t.version)}validate(){if(!Number.isInteger(this.version)||this.version<1)throw Error(`IndexedDB version must be a positive integer.`);this.migrations.forEach(e=>{if(!Number.isInteger(e.version)||e.version<1)throw Error(`Migration "${e.id}" must define a positive integer version.`);if(e.version>this.version)throw Error(`Migration "${e.id}" is newer than the configured database version.`)})}getUpgradeMigrations(e,t){return this.migrations.filter(n=>n.version>e&&n.version<=t)}getPostUpgradeMigrations(e,t){return this.getUpgradeMigrations(e,t).filter(e=>typeof e.afterUpgrade==`function`)}};function ie(e={}){return e.only===void 0?e.lower!==void 0&&e.upper!==void 0?IDBKeyRange.bound(e.lower,e.upper,e.excludeLower??!1,e.excludeUpper??!1):e.lower===void 0?e.upper===void 0?null:IDBKeyRange.upperBound(e.upper,e.excludeUpper??!1):IDBKeyRange.lowerBound(e.lower,e.excludeLower??!1):IDBKeyRange.only(e.only)}function ae(e=`next`){if(!new Set([`next`,`nextunique`,`prev`,`prevunique`]).has(e))throw Error(`Unsupported cursor direction "${e}".`);return e}var oe=class{#e;#t;constructor({databaseName:e,version:t,migrations:n=[],logger:r}){this.databaseName=e,this.version=t,this.migrations=n,this.logger=r,this.#t=new re({version:t,migrations:n}),this.#t.validate()}async initialize(){await this.getDatabase()}async getDatabase(){return this.#e||=this.#n(),this.#e}async getStoreNames(){return[...(await this.getDatabase()).objectStoreNames]}async hasStore(e){return(await this.getDatabase()).objectStoreNames.contains(e)}async getAll(e){return this.request(e,`readonly`,e=>e.getAll())}async getById(e,t){return this.request(e,`readonly`,e=>e.get(t))}async getByIndex(e,t,n){return this.request(e,`readonly`,e=>e.index(t).get(n))}async getAllByIndex(e,t,n={}){return this.request(e,`readonly`,e=>e.index(t).getAll(ie(n)))}async add(e,t){return this.request(e,`readwrite`,e=>e.add(t))}async put(e,t){return this.request(e,`readwrite`,e=>e.put(t))}async bulkPut(e,t){if(!Array.isArray(t))throw Error(`bulkPut expects an array of records.`);return this.transaction([e],`readwrite`,({getStore:n})=>{let r=n(e);return t.forEach(e=>r.put(e)),t.length})}async delete(e,t){return this.request(e,`readwrite`,e=>e.delete(t))}async clear(e){return this.request(e,`readwrite`,e=>e.clear())}async count(e,t={}){return this.request(e,`readonly`,e=>e.count(ie(t)))}async exists(e,t){return await this.getById(e,t)!==void 0}async query(e,t={}){let{direction:n,indexName:r,limit:i=1/0,predicate:a,range:o}=t;return this.transaction([e],`readonly`,({getStore:t})=>{let s=t(e),c=r?s.index(r):s,l=[],u=c.openCursor(ie(o),ae(n));return u.onsuccess=()=>{let e=u.result;!e||l.length>=i||((!a||a(e.value))&&l.push(e.value),e.continue())},l})}async request(e,t,n){return this.transaction([e],t,({getStore:t})=>n(t(e)),{resolveRequestResult:!0})}async transaction(e,t,n,r={}){if(!Array.isArray(e)||e.length===0)throw Error(`transaction requires at least one object store.`);let i=await this.getDatabase(),a=e.filter(e=>!i.objectStoreNames.contains(e));if(a.length>0)throw Error(`Unknown object stores: ${a.join(`, `)}.`);return new Promise((a,o)=>{let s=i.transaction(e,t),c,l=e=>s.objectStore(e);s.oncomplete=()=>a(c),s.onerror=()=>o(s.error),s.onabort=()=>o(s.error);try{let e=n({database:i,getStore:l,transaction:s});if(r.resolveRequestResult&&e){e.onsuccess=()=>{c=e.result},e.onerror=()=>{s.abort()};return}c=e}catch(e){s.abort(),o(e)}})}close(){this.#e&&=(this.#e.then(e=>e.close()),void 0)}#n(){return new Promise((e,t)=>{let n=indexedDB.open(this.databaseName,this.version),r=0,i=this.version,a=!1;n.onupgradeneeded=e=>{let t=n.result;a=!0,r=e.oldVersion,i=e.newVersion??this.version,this.#t.getUpgradeMigrations(r,i).forEach(e=>{e.up({database:t,oldVersion:r,newVersion:i,transaction:n.transaction})})},n.onsuccess=async()=>{let o=n.result,s=a?this.#t.getPostUpgradeMigrations(r,i):[];try{for(let e of s)await e.afterUpgrade({database:o,oldVersion:r,newVersion:i});this.logger?.info(`IndexedDB initialized.`,{databaseName:this.databaseName,version:this.version}),e(o)}catch(e){o.close(),t(e)}},n.onerror=()=>t(n.error)})}};function g(e,t,n){if(e.objectStoreNames.contains(t.name))return ce(n,t.name);let r=e.createObjectStore(t.name,{keyPath:t.keyPath??`id`,autoIncrement:t.autoIncrement??!1});return se(r,t.indexes??[]),r}function se(e,t){t.forEach(t=>{e.indexNames.contains(t.name)||e.createIndex(t.name,t.keyPath,{multiEntry:t.multiEntry??!1,unique:t.unique??!1})})}function ce(e,t){if(!e)throw Error(`Object store "${t}" already exists outside an upgrade transaction.`);return e.objectStore(t)}var le=Object.freeze([{version:1,id:`001_create_persistence_system_stores`,description:`Create reusable persistence metadata and migration stores.`,up({database:e,transaction:t}){l.forEach(n=>g(e,n,t))},afterUpgrade({database:e}){return Promise.all([_(e,{key:`database`,value:{name:e.name,version:e.version}}),v(e,{id:`001_create_persistence_system_stores`,version:1,description:`Create reusable persistence metadata and migration stores.`})])}},{version:2,id:`002_create_core_mvp_stores`,description:`Create Core MVP stores for approved offline modules.`,up({database:e,transaction:t}){d.forEach(n=>g(e,n,t))},afterUpgrade({database:e}){return Promise.all([_(e,{key:`database`,value:{name:e.name,version:e.version,stores:Object.values(u)}}),v(e,{id:`002_create_core_mvp_stores`,version:2,description:`Create Core MVP stores for approved offline modules.`})])}},{version:3,id:`003_create_daily_habits_store`,description:`Create Daily Habits store for quick water, sleep, and steps logging.`,up({database:e,transaction:t}){f.forEach(n=>g(e,n,t))},afterUpgrade({database:e}){return Promise.all([_(e,{key:`database`,value:{name:e.name,version:e.version,stores:Object.values(u)}}),v(e,{id:`003_create_daily_habits_store`,version:3,description:`Create Daily Habits store for quick water, sleep, and steps logging.`})])}},{version:4,id:`004_create_food_library_store`,description:`Create Food Library store for reusable nutrition data.`,up({database:e,transaction:t}){ee.forEach(n=>g(e,n,t))},afterUpgrade({database:e}){return Promise.all([_(e,{key:`database`,value:{name:e.name,version:e.version,stores:Object.values(u)}}),v(e,{id:`004_create_food_library_store`,version:4,description:`Create Food Library store for reusable nutrition data.`})])}},{version:5,id:`005_create_favorite_meals_store`,description:`Create Favorite Meals store for reusable recipes referencing the Food Library.`,up({database:e,transaction:t}){p.forEach(n=>g(e,n,t))},afterUpgrade({database:e}){return Promise.all([_(e,{key:`database`,value:{name:e.name,version:e.version,stores:Object.values(u)}}),v(e,{id:`005_create_favorite_meals_store`,version:5,description:`Create Favorite Meals store for reusable recipes referencing the Food Library.`})])}},{version:6,id:`006_create_meal_plans_store`,description:`Create Meal Plans store for reusable daily eating plans referencing Favorite Meals.`,up({database:e,transaction:t}){m.forEach(n=>g(e,n,t))},afterUpgrade({database:e}){return Promise.all([_(e,{key:`database`,value:{name:e.name,version:e.version,stores:Object.values(u)}}),v(e,{id:`006_create_meal_plans_store`,version:6,description:`Create Meal Plans store for reusable daily eating plans referencing Favorite Meals.`})])}}]);function _(e,t){return e.objectStoreNames.contains(c.metadata)?new Promise((n,r)=>{let i=e.transaction(c.metadata,`readwrite`);i.objectStore(c.metadata).put({...t,updatedAt:new Date().toISOString()}),i.oncomplete=()=>n(),i.onerror=()=>r(i.error),i.onabort=()=>r(i.error)}):Promise.resolve()}function v(e,t){return e.objectStoreNames.contains(c.migrations)?new Promise((n,r)=>{let i=e.transaction(c.migrations,`readwrite`);i.objectStore(c.migrations).put({...t,completedAt:new Date().toISOString()}),i.oncomplete=()=>n(),i.onerror=()=>r(i.error),i.onabort=()=>r(i.error)}):Promise.resolve()}function ue({logger:e}){let t=new oe({databaseName:h.databaseName,version:h.version,migrations:le,logger:e}),n=new o({storage:t});return{backupService:new ne({storage:t,databaseName:h.databaseName,version:h.version}),repositoryFactory:n,storage:t}}function y(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function b(e,t){return e===t?`selected`:``}var de=20,fe=3500,pe=300,x=null;function S({icon:e,title:t,message:n}){let r=me(),i=document.createElement(`div`);i.className=`toast`,i.setAttribute(`role`,`status`),i.innerHTML=`
    <span class="toast__icon" aria-hidden="true">${y(e)}</span>
    <div class="toast__body">
      <p class="toast__title">${y(t)}</p>
      <p class="toast__message">${y(n)}</p>
    </div>
    <div class="toast__progress-track">
      <span class="toast__progress-bar"></span>
    </div>
  `,r.appendChild(i);let a=i.querySelector(`.toast__progress-bar`);window.setTimeout(()=>{i.classList.add(`toast--visible`),a.style.transitionDuration=`${fe}ms`,requestAnimationFrame(()=>{a.style.width=`0%`})},de),window.setTimeout(()=>{i.classList.remove(`toast--visible`),window.setTimeout(()=>i.remove(),pe)},fe)}function me(){return x&&document.body.contains(x)?x:(x=document.createElement(`div`),x.className=`toast-region`,x.setAttribute(`aria-live`,`polite`),document.body.appendChild(x),x)}var he=Object.freeze({water:{icon:`💧`,titleKey:`toast.water.title`,messageKey:`toast.water.message`},protein:{icon:`💪`,titleKey:`toast.protein.title`,messageKey:`toast.protein.message`},calories:{icon:`🔥`,titleKey:`toast.calories.title`,messageKey:`toast.calories.message`},steps:{icon:`👣`,titleKey:`toast.steps.title`,messageKey:`toast.steps.message`},sleep:{icon:`😴`,titleKey:`toast.sleep.title`,messageKey:`toast.sleep.message`}});function ge({eventBus:e,getI18nContext:t}){e.subscribe(`dashboard:goal-achieved`,({key:e}={})=>{let n=he[e];if(!n)return;let r=t();S({icon:n.icon,title:r.t(n.titleKey),message:r.t(n.messageKey)})}),e.subscribe(`dashboard:all-goals-achieved`,()=>{let e=t();S({icon:`🏆`,title:e.t(`toast.allGoals.title`),message:e.t(`toast.allGoals.message`)})})}var C=`Health Weight Pro`,_e=Object.freeze([{value:`en`,labelKey:`language.english`},{value:`pt-BR`,labelKey:`language.portugueseBrazil`}]),ve=Object.freeze([{value:`light`,labelKey:`theme.light`},{value:`dark`,labelKey:`theme.dark`},{value:`system`,labelKey:`theme.system`}]),ye=Object.freeze({en:{weight:`lb`,measurement:`in`,dateFormat:`MM/dd/yyyy`},"pt-BR":{weight:`kg`,measurement:`cm`,dateFormat:`dd/MM/yyyy`}}),be=Object.freeze({en:{"app.name":C,"app.version":`Version {version}`,"app.versionLabel":`Application Version`,"developer.title":`Developer`,"developer.reimportCatalog":`Reimport Starter Food Catalog`,"developer.clearDatabase":`Clear IndexedDB`,"developer.resetFirstLaunch":`Reset App to First Launch`,"developer.exportLogs":`Export Application Logs`,"developer.clearDatabaseConfirmTitle":`Clear IndexedDB?`,"developer.clearDatabaseConfirmMessage":`This deletes all locally stored data and reloads the app. This cannot be undone.`,"developer.resetFirstLaunchConfirmTitle":`Reset to First Launch?`,"developer.resetFirstLaunchConfirmMessage":`This clears the database, the service worker, and all caches, then reloads the app as if freshly installed. This cannot be undone.`,"developer.enabledTitle":`Developer Mode Enabled`,"developer.enabledMessage":`A Developer section is now available at the bottom of Settings.`,"developer.appVersionLabel":`App Version`,"developer.databaseVersionLabel":`Database Version`,"developer.catalogVersionLabel":`Catalog Version (Current)`,"developer.catalogVersionStoredLabel":`Catalog Version (Stored)`,"developer.unknown":`Unknown`,"developer.serviceWorkerLabel":`Service Worker`,"developer.serviceWorkerActive":`Active`,"developer.serviceWorkerInactive":`Inactive`,"developer.logsExportedTitle":`Logs Copied`,"developer.logsExportedMessage":`Application logs were copied to the clipboard.`,"developer.catalogReimportedMessage":`Starter food catalog reimported successfully.`,"aria.primaryNavigation":`Primary navigation`,"aria.mobileNavigation":`Mobile navigation`,"aria.coreTotals":`Core MVP totals`,"aria.quickActions":`Quick actions`,"section.core":`Core`,"section.tracking":`Tracking`,"section.medication":`Medication`,"section.support":`Support`,"route.dashboard":`Dashboard`,"route.mealJournal":`Meal Journal`,"route.weightTracking":`Weight Tracking`,"route.bodyMeasurements":`Body Measurements`,"route.medication":`Medication`,"route.favorites":`Favorites`,"route.mealPlans":`Meal Plans`,"route.foodLibrary":`Food Library`,"route.settings":`Settings`,"route.backupRestore":`Backup & Restore`,"language.english":`English`,"language.portugueseBrazil":`Portuguese (Brazil)`,"theme.light":`Light`,"theme.dark":`Dark`,"theme.system":`Follow System`,"common.add":`Add`,"common.addRecords":`Add records to populate this area`,"common.automatic":`Automatic`,"common.back":`Back`,"common.close":`Close`,"common.cancel":`Cancel`,"common.confirm":`Confirm`,"common.date":`Date`,"common.delete":`Delete`,"common.edit":`Edit`,"common.noNotes":`No notes`,"common.noRecord":`No record`,"common.noRecordsYet":`No records yet`,"common.notes":`Notes`,"common.reset":`Reset`,"common.save":`Save`,"common.saveChanges":`Save Changes`,"common.unit":`Unit`,"common.current":`Current`,"common.goal":`Goal`,"common.remainingToday":`Remaining today`,"common.reached":`Goal reached`,"common.normal":`Normal progress`,"common.attention":`Attention`,"common.critical":`Critical`,"common.enabled":`Enabled`,"dashboard.eyebrow":`Core MVP`,"dashboard.description":`Your local overview for journal entries, tracking records, measurements, and medication logs.`,"dashboard.smartSummary":`Daily Summary`,"dashboard.greeting":`Good morning {name}.`,"dashboard.greetingNoName":`Good morning.`,"dashboard.todayConsumed":`Today you consumed`,"dashboard.currentProgress":`Current Progress`,"dashboard.configuredGoals":`Configured Goals`,"dashboard.calories":`Calories`,"dashboard.protein":`Protein`,"dashboard.water":`Water`,"dashboard.sleep":`Sleep`,"dashboard.weight":`Weight`,"dashboard.medication":`Medication`,"dashboard.steps":`Steps`,"dashboard.stepsUnit":`steps`,"dashboard.remaining":`Remaining`,"dashboard.goalAchieved":`Goal achieved`,"dashboard.goalNotAchieved":`Goal not achieved`,"dashboard.allGoalsAchieved":`All goals achieved`,"dashboard.recentMealsCard":`Recent Meals`,"dashboard.recentActivityCard":`Recent Activity`,"dashboard.missingPrefix":`Still missing`,"dashboard.allSet":`You are on track for the configured goals.`,"dashboard.meals":`Meals`,"dashboard.weightRecords":`Weight Records`,"dashboard.bodyMeasurements":`Body Measurements`,"dashboard.medicationApplications":`Medication Applications`,"dashboard.recentActivity":`Recent Activity`,"dashboard.latestMeal":`Latest meal`,"dashboard.latestWeight":`Latest weight`,"dashboard.latestMeasurement":`Latest measurement`,"dashboard.latestDose":`Latest dose`,"dashboard.nextApplication":`Next application`,"meal.description":`Log meals and notes for offline daily tracking.`,"meal.edit":`Edit meal`,"meal.add":`Add meal`,"meal.type":`Type`,"meal.breakfast":`Breakfast`,"meal.lunch":`Lunch`,"meal.dinner":`Dinner`,"meal.snack":`Snack`,"meal.meal":`Meal`,"mealSlot.breakfast":`Breakfast`,"mealSlot.lunch":`Lunch`,"mealSlot.dinner":`Dinner`,"mealSlot.morningSnack":`Morning Snack`,"mealSlot.afternoonSnack":`Afternoon Snack`,"mealSlot.preWorkout":`Pre Workout`,"mealSlot.postWorkout":`Post Workout`,"mealSlot.supper":`Supper`,"meal.name":`Meal name`,"meal.placeholder":`Chicken bowl, protein shake...`,"meal.optionalNotes":`Optional notes`,"meal.addButton":`Add Meal`,"meal.listTitle":`Meals`,"meal.empty":`No meals yet.`,"weight.description":`Record body weight over time with simple editable entries.`,"weight.edit":`Edit weight`,"weight.add":`Add weight`,"weight.weight":`Weight`,"weight.addButton":`Add Weight`,"weight.listTitle":`Weight Records`,"weight.empty":`No weight records yet.`,"body.description":`Track body measurements locally with simple editable records.`,"body.edit":`Edit measurements`,"body.add":`Add measurements`,"body.chest":`Chest`,"body.waist":`Waist`,"body.hips":`Hips`,"body.arm":`Arm`,"body.thigh":`Thigh`,"body.addButton":`Add Measurements`,"body.listTitle":`Measurement Records`,"body.empty":`No body measurement records yet.`,"medication.description":`Record application date, dose amount, site, and notes for local reference.`,"medication.edit":`Edit application`,"medication.add":`Add application`,"medication.doseAmount":`Dose`,"medication.site":`Site`,"medication.notSpecified":`Not specified`,"medication.abdomen":`Abdomen`,"medication.thigh":`Thigh`,"medication.upperArm":`Upper arm`,"medication.addButton":`Add Application`,"medication.listTitle":`Application History`,"medication.empty":`No medication applications yet.`,"habit.quickActions":`Quick Actions`,"habit.meal":`Meal`,"habit.water":`Water`,"habit.sleep":`Sleep`,"habit.steps":`Steps`,"habit.medication":`Medication`,"habit.customAmount":`Custom amount (mL)`,"habit.hours":`Hours`,"habit.minutes":`Minutes`,"habit.stepsCount":`Steps`,"habit.todaysSteps":`Today's Steps`,"habit.sleepQuestion":`How many hours did you sleep?`,"habit.sleepGoalHint":`Your sleep goal is configured in Settings.`,"fab.registerMeal":`Register Meal`,"fab.favorites":`Favorites`,"fab.mealPlans":`Meal Plans`,"fab.foodLibrary":`Food Library`,"nutriIa.title":`Nutri IA+`,"nutriIa.description":`Paste your HWP_FOOD below.`,"nutriIa.placeholder":`Paste your HWP_FOOD here...`,"nutriIa.validDetected":`Valid HWP_FOOD detected.`,"nutriIa.invalidMessage":`This content is not a valid HWP_FOOD. Use the Help button below to learn how to generate one.`,"nutriIa.helpLink":`How do I generate an HWP_FOOD?`,"nutriIa.helpIntro":`Health Weight Pro uses a standardized nutrition format called HWP_FOOD. You can generate it using any AI assistant.`,"nutriIa.helpOtherAssistants":`Other AI assistants`,"nutriIa.helpStep1":`Describe your meal to your preferred AI.`,"nutriIa.helpStep2":`Ask it to convert the meal into HWP_FOOD.`,"nutriIa.helpStep3":`Copy the generated HWP_FOOD.`,"nutriIa.helpStep4":`Paste it into Nutri IA+.`,"nutriIa.copyPrompt":`Copy Prompt`,"nutriIa.promptCopiedTitle":`Copied!`,"nutriIa.promptCopiedMessage":`The Nutri IA+ prompt is ready to paste into your AI assistant.`,"nutriIa.promptCopyFailedTitle":`Could not copy`,"nutriIa.promptCopyFailedMessage":`Please copy the prompt manually.`,"nutriIa.importButton":`Import`,"nutriIa.imported":`Imported`,"nutriIa.mealLabel":`Meal`,"nutriIa.mealSlotLabel":`Meal Slot`,"nutriIa.originLabel":`Origin`,"toast.mealImported.title":`Meal Imported`,"toast.mealImported.message":`Your meal has been successfully added.`,"toast.favoriteRegistered.title":`Meal Registered`,"toast.favoriteRegistered.message":`Your favorite meal was added to today’s journal.`,"toast.mealPlanRegistered.title":`Meal Plan Registered`,"toast.mealPlanRegistered.message":`Every meal in the plan was added to today’s journal.`,"nutriIa.saveAsFavoritePrompt":`Want to register this meal in one tap next time?`,"favorites.description":`Save your favorite meals for one-tap logging.`,"favorites.emptyTitle":`You have no Favorite Meals yet.`,"favorites.emptyHint":`Create your first favorite meal to speed up meal registration.`,"favorites.createButton":`Create Favorite Meal`,"favorites.createFavorite":`Create Favorite Meal`,"favorites.editFavorite":`Edit Favorite Meal`,"favorites.searchPlaceholder":`Search favorite meals...`,"favorites.allCategories":`All Categories`,"favorites.category":`Category`,"favorites.category.custom":`Custom`,"favorites.sortLabel":`Sort by`,"favorites.sort.mostUsed":`Most Used`,"favorites.sort.recentlyUsed":`Recently Used`,"favorites.sort.alphabetical":`Alphabetical`,"favorites.foodsCount":`{count} foods`,"favorites.noResults":`No favorite meals match your search.`,"favorites.mealName":`Meal Name`,"favorites.namePlaceholder":`Protein breakfast bowl, post-workout shake...`,"favorites.nextButton":`Next`,"favorites.searchFoodPlaceholder":`Search Food Library...`,"favorites.addFoodButton":`Add Food`,"favorites.addedFoods":`Added Foods`,"favorites.noFoodsAddedYet":`No foods added yet.`,"favorites.continueToPreview":`Review`,"favorites.saveFavorite":`Save Favorite Meal`,"favorites.saveAsFavorite":`Save as Favorite Meal`,"favorites.deleteConfirmTitle":`Delete Favorite Meal`,"favorites.deleteConfirmMessage":`Are you sure you want to delete {name}? This action cannot be undone.`,"mealPlans.description":`Organize your Favorite Meals into reusable daily eating plans.`,"mealPlans.emptyTitle":`No Meal Plans yet.`,"mealPlans.emptyHint":`Create your first meal plan.`,"mealPlans.createButton":`Create Meal Plan`,"mealPlans.createPlan":`Create Meal Plan`,"mealPlans.editPlan":`Edit Meal Plan`,"mealPlans.searchPlaceholder":`Search meal plans...`,"mealPlans.noResults":`No meal plans match your search.`,"mealPlans.mealsCount":`{count} meals`,"mealPlans.planName":`Plan Name`,"mealPlans.namePlaceholder":`Cutting week, training day...`,"mealPlans.planDescription":`Description`,"mealPlans.descriptionPlaceholder":`Optional notes about this plan`,"mealPlans.searchFavoritesPlaceholder":`Search Favorite Meals...`,"mealPlans.addedMeals":`Added Meals`,"mealPlans.noMealsAddedYet":`No meals added yet.`,"mealPlans.assignSlot":`Meal Slot`,"mealPlans.addToPlanButton":`Add to Plan`,"mealPlans.savePlanButton":`Save Meal Plan`,"mealPlans.deleteConfirmTitle":`Delete Meal Plan`,"mealPlans.deleteConfirmMessage":`Are you sure you want to delete {name}? This action cannot be undone.`,"foodLibrary.description":`Browse and reuse foods you have logged before.`,"foodLibrary.emptyTitle":`Your Food Library is empty.`,"foodLibrary.emptyHint":`Start adding foods to speed up future meal registrations.`,"foodLibrary.addFood":`Add Food`,"foodLibrary.editFood":`Edit Food`,"foodLibrary.searchPlaceholder":`Search foods...`,"foodLibrary.allCategories":`All Categories`,"foodLibrary.category":`Category`,"foodLibrary.category.fruits":`Fruits`,"foodLibrary.category.vegetables":`Vegetables`,"foodLibrary.category.legumes":`Legumes`,"foodLibrary.category.grains":`Grains`,"foodLibrary.category.roots":`Roots`,"foodLibrary.category.nuts":`Nuts & Seeds`,"foodLibrary.category.meat":`Meat`,"foodLibrary.category.chicken":`Chicken`,"foodLibrary.category.fish":`Fish`,"foodLibrary.category.eggs":`Eggs`,"foodLibrary.category.dairy":`Dairy`,"foodLibrary.category.bread":`Bread`,"foodLibrary.category.beverages":`Beverages`,"foodLibrary.category.supplements":`Supplements`,"foodLibrary.category.desserts":`Desserts`,"foodLibrary.category.snacks":`Snacks`,"foodLibrary.category.others":`Others`,"foodLibrary.foodName":`Food Name`,"foodLibrary.servingSize":`Serving Size`,"foodLibrary.servingUnit":`Serving Unit`,"foodLibrary.unit.unit":`unit`,"foodLibrary.unit.slice":`slice`,"foodLibrary.unit.scoop":`scoop`,"foodLibrary.unit.cup":`cup`,"foodLibrary.unit.tablespoon":`tablespoon`,"foodLibrary.unit.serving":`serving`,"foodLibrary.noResults":`No foods match your search.`,"foodLibrary.chooseQuantity":`Choose Quantity`,"foodLibrary.quantity":`Quantity`,"foodLibrary.addToMeal":`Add to Meal`,"foodLibrary.deleteConfirmTitle":`Delete Food`,"foodLibrary.deleteConfirmMessage":`Are you sure you want to delete {name}? This action cannot be undone.`,"toast.water.title":`Excellent!`,"toast.water.message":`You've reached today's hydration goal.`,"toast.protein.title":`Great job!`,"toast.protein.message":`Your protein goal has been completed.`,"toast.calories.title":`Perfect!`,"toast.calories.message":`Your calorie target has been reached.`,"toast.steps.title":`Congratulations!`,"toast.steps.message":`You reached today's step goal.`,"toast.sleep.title":`Well rested!`,"toast.sleep.message":`You achieved your sleep goal.`,"toast.allGoals.title":`Outstanding!`,"toast.allGoals.message":`You completed all of today's health goals.`,"settings.description":`Manage local preferences for this offline-first application.`,"settings.preferences":`Preferences`,"settings.language":`Language`,"settings.theme":`Theme`,"settings.units":`Units`,"settings.weightUnit":`Weight`,"settings.measurementUnit":`Measurements`,"settings.dateFormat":`Date format`,"settings.unitsAutomatic":`Units follow the selected language automatically.`,"settings.save":`Save Settings`,"settings.backupExport":`Backup Export`,"settings.backupImport":`Backup Import`,"settings.profile":`User Profile`,"settings.personalInfo":`Personal Information`,"settings.name":`Name`,"settings.sex":`Sex`,"settings.sexFemale":`Female`,"settings.sexMale":`Male`,"settings.sexOther":`Other`,"settings.sexNotSet":`Prefer not to say`,"settings.birthDate":`Birth Date`,"settings.height":`Height`,"settings.goal":`Goal`,"settings.goalLoseWeight":`Lose Weight`,"settings.goalMaintainWeight":`Maintain Weight`,"settings.goalGainMuscle":`Gain Muscle`,"settings.activityLevel":`Activity Level`,"settings.activitySedentary":`Sedentary`,"settings.activityLight":`Light`,"settings.activityModerate":`Moderate`,"settings.activityIntense":`Intense`,"settings.dailyGoals":`Daily Goals`,"settings.weightGoals":`Weight`,"settings.currentWeight":`Current Weight`,"settings.targetWeight":`Target Weight`,"settings.nutritionGoals":`Nutrition`,"settings.calories":`Calories`,"settings.protein":`Protein`,"settings.carbohydrates":`Carbohydrates`,"settings.fat":`Fat`,"settings.fiber":`Fiber`,"settings.hydration":`Hydration`,"settings.dailyWaterGoal":`Daily Water Goal`,"settings.sleep":`Sleep`,"settings.dailySleepGoal":`Daily Sleep Goal`,"settings.steps":`Steps`,"settings.dailyStepGoal":`Daily Step Goal`,"settings.medication":`Medication`,"settings.enableMedicationTracking":`Enable medication tracking`,"settings.medicationName":`Medication Name`,"settings.administrationType":`Administration Type`,"settings.administration.injection":`Injection`,"settings.administration.tablet":`Tablet`,"settings.administration.capsule":`Capsule`,"settings.administration.drops":`Drops`,"settings.administration.cream":`Cream`,"settings.administration.other":`Other`,"settings.frequency":`Frequency`,"settings.frequency.daily":`Daily`,"settings.frequency.weekly":`Weekly`,"settings.frequency.every-2-weeks":`Every 2 Weeks`,"settings.frequency.monthly":`Monthly`,"settings.frequency.custom":`Custom`,"settings.defaultDose":`Default Dose`,"settings.doseUnit":`Dose Unit`,"settings.doseUnit.mg":`mg`,"settings.doseUnit.mcg":`mcg`,"settings.doseUnit.mL":`mL`,"settings.doseUnit.IU":`IU`,"settings.doseUnit.units":`Units`,"settings.doseUnit.other":`Other`,"settings.applicationDay":`Application Day`,"settings.medicationNotes":`Optional Notes`,"settings.dashboardPreferences":`Dashboard Preferences`,"settings.visibleMealSlots":`Visible Meal Slots`,"settings.visibleMealSlotsHint":`Choose which optional meal slots appear throughout the app. Breakfast, lunch, and dinner are always visible.`,"day.monday":`Monday`,"day.tuesday":`Tuesday`,"day.wednesday":`Wednesday`,"day.thursday":`Thursday`,"day.friday":`Friday`,"day.saturday":`Saturday`,"day.sunday":`Sunday`,"backup.description":`Export and import local app data as JSON.`,"backup.export":`Export`,"backup.exportJson":`Export JSON`,"backup.import":`Import`,"backup.importJson":`Import JSON`,"backup.json":`Backup JSON`,"backup.placeholder":`Paste exported JSON here`,"message.recordSaved":`Record saved.`,"message.recordDeleted":`Record deleted.`,"message.mealImported":`Meal imported.`,"message.foodAddedToMeal":`Meal added from Food Library.`,"message.favoriteRegistered":`Favorite meal registered to today.`,"message.mealPlanRegistered":`Meal plan registered to today.`,"message.settingsSaved":`Settings saved.`,"message.settingsReset":`Settings reset.`,"message.backupExported":`Backup exported.`,"message.backupImported":`Backup imported: {stores}.`,"message.noStores":`no stores`,"error.backupInvalidJson":`Backup JSON is invalid.`,"error.backupUnknownStores":`Backup contains unknown data stores: {stores}.`,"error.backupUnsupportedFormat":`Unsupported backup format.`,"error.backupNoStores":`Backup does not contain stores.`,"error.backupStoreRecords":`Each backup store must contain a record list.`,"validation.dateRequired":`Date is required.`,"validation.mealNameRequired":`Meal name is required.`,"validation.weightPositive":`Weight must be greater than zero.`,"validation.measurementRequired":`Enter at least one measurement.`,"validation.dosePositive":`Dose must be greater than zero.`,"validation.foodNameRequired":`Food name is required.`,"validation.servingSizePositive":`Serving size must be greater than zero.`,"validation.favoriteMealNameRequired":`Favorite meal name is required.`,"validation.favoriteMealItemsRequired":`Add at least one food to the favorite meal.`,"validation.mealPlanNameRequired":`Meal plan name is required.`,"validation.mealPlanMealsRequired":`Add at least one meal to the plan.`},"pt-BR":{"app.name":C,"app.version":`Versão {version}`,"app.versionLabel":`Versão do Aplicativo`,"developer.title":`Desenvolvedor`,"developer.reimportCatalog":`Reimportar Catálogo Inicial de Alimentos`,"developer.clearDatabase":`Limpar IndexedDB`,"developer.resetFirstLaunch":`Redefinir Aplicativo para Primeira Instalação`,"developer.exportLogs":`Exportar Logs do Aplicativo`,"developer.clearDatabaseConfirmTitle":`Limpar o IndexedDB?`,"developer.clearDatabaseConfirmMessage":`Isso apaga todos os dados armazenados localmente e recarrega o aplicativo. Esta ação não pode ser desfeita.`,"developer.resetFirstLaunchConfirmTitle":`Redefinir para Primeira Instalação?`,"developer.resetFirstLaunchConfirmMessage":`Isso limpa o banco de dados, o service worker e todos os caches, recarregando o aplicativo como recém-instalado. Esta ação não pode ser desfeita.`,"developer.enabledTitle":`Modo Desenvolvedor Ativado`,"developer.enabledMessage":`Uma seção Desenvolvedor agora está disponível na parte inferior de Configurações.`,"developer.appVersionLabel":`Versão do Aplicativo`,"developer.databaseVersionLabel":`Versão do Banco de Dados`,"developer.catalogVersionLabel":`Versão do Catálogo (Atual)`,"developer.catalogVersionStoredLabel":`Versão do Catálogo (Armazenada)`,"developer.unknown":`Desconhecido`,"developer.serviceWorkerLabel":`Service Worker`,"developer.serviceWorkerActive":`Ativo`,"developer.serviceWorkerInactive":`Inativo`,"developer.logsExportedTitle":`Logs Copiados`,"developer.logsExportedMessage":`Os logs do aplicativo foram copiados para a área de transferência.`,"developer.catalogReimportedMessage":`Catálogo inicial de alimentos reimportado com sucesso.`,"aria.primaryNavigation":`Navegação principal`,"aria.mobileNavigation":`Navegação móvel`,"aria.coreTotals":`Totais do MVP principal`,"aria.quickActions":`Ações rápidas`,"section.core":`Principal`,"section.tracking":`Acompanhamento`,"section.medication":`Medicação`,"section.support":`Suporte`,"route.dashboard":`Painel`,"route.mealJournal":`Diário Alimentar`,"route.weightTracking":`Peso`,"route.bodyMeasurements":`Medidas Corporais`,"route.medication":`Medicação`,"route.favorites":`Favoritos`,"route.mealPlans":`Planos de Refeição`,"route.foodLibrary":`Biblioteca de Alimentos`,"route.settings":`Configurações`,"route.backupRestore":`Backup e Restauração`,"language.english":`Inglês`,"language.portugueseBrazil":`Português (Brasil)`,"theme.light":`Claro`,"theme.dark":`Escuro`,"theme.system":`Seguir Sistema`,"common.add":`Adicionar`,"common.addRecords":`Adicione registros para preencher esta área`,"common.automatic":`Automático`,"common.back":`Voltar`,"common.close":`Fechar`,"common.cancel":`Cancelar`,"common.confirm":`Confirmar`,"common.date":`Data`,"common.delete":`Excluir`,"common.edit":`Editar`,"common.noNotes":`Sem notas`,"common.noRecord":`Sem registro`,"common.noRecordsYet":`Nenhum registro ainda`,"common.notes":`Notas`,"common.reset":`Redefinir`,"common.save":`Salvar`,"common.saveChanges":`Salvar Alterações`,"common.unit":`Unidade`,"common.current":`Atual`,"common.goal":`Meta`,"common.remainingToday":`Restante hoje`,"common.reached":`Meta alcancada`,"common.normal":`Progresso normal`,"common.attention":`Atencao`,"common.critical":`Critico`,"common.enabled":`Ativado`,"dashboard.eyebrow":`MVP Principal`,"dashboard.description":`Sua visão geral local de refeições, registros de peso, medidas e medicações.`,"dashboard.meals":`Refeições`,"dashboard.smartSummary":`Resumo Diario`,"dashboard.greeting":`Bom dia {name}.`,"dashboard.greetingNoName":`Bom dia.`,"dashboard.todayConsumed":`Hoje voce consumiu`,"dashboard.currentProgress":`Progresso Atual`,"dashboard.configuredGoals":`Metas Configuradas`,"dashboard.calories":`Calorias`,"dashboard.protein":`Proteina`,"dashboard.water":`Agua`,"dashboard.sleep":`Sono`,"dashboard.weight":`Peso`,"dashboard.medication":`Medicação`,"dashboard.steps":`Passos`,"dashboard.stepsUnit":`passos`,"dashboard.remaining":`Restante`,"dashboard.goalAchieved":`Meta alcançada`,"dashboard.goalNotAchieved":`Meta não alcançada`,"dashboard.allGoalsAchieved":`Todas as metas alcançadas`,"dashboard.recentMealsCard":`Refeicoes Recentes`,"dashboard.recentActivityCard":`Atividade Recente`,"dashboard.missingPrefix":`Ainda falta`,"dashboard.allSet":`Voce esta no caminho das metas configuradas.`,"dashboard.weightRecords":`Registros de Peso`,"dashboard.bodyMeasurements":`Medidas Corporais`,"dashboard.medicationApplications":`Aplicações de Medicação`,"dashboard.recentActivity":`Atividade Recente`,"dashboard.latestMeal":`Última refeição`,"dashboard.latestWeight":`Último peso`,"dashboard.latestMeasurement":`Última medida`,"dashboard.latestDose":`Última dose`,"dashboard.nextApplication":`Próxima aplicação`,"meal.description":`Registre refeições e notas para acompanhamento diário offline.`,"meal.edit":`Editar refeição`,"meal.add":`Adicionar refeição`,"meal.type":`Tipo`,"meal.breakfast":`Café da manhã`,"meal.lunch":`Almoço`,"meal.dinner":`Jantar`,"meal.snack":`Lanche`,"meal.meal":`Refeição`,"mealSlot.breakfast":`Café da Manhã`,"mealSlot.lunch":`Almoço`,"mealSlot.dinner":`Jantar`,"mealSlot.morningSnack":`Lanche da Manhã`,"mealSlot.afternoonSnack":`Lanche da Tarde`,"mealSlot.preWorkout":`Pré-Treino`,"mealSlot.postWorkout":`Pós-Treino`,"mealSlot.supper":`Ceia`,"meal.name":`Nome da refeição`,"meal.placeholder":`Frango com arroz, shake de proteína...`,"meal.optionalNotes":`Notas opcionais`,"meal.addButton":`Adicionar Refeição`,"meal.listTitle":`Refeições`,"meal.empty":`Nenhuma refeição ainda.`,"weight.description":`Registre o peso corporal ao longo do tempo com entradas editáveis.`,"weight.edit":`Editar peso`,"weight.add":`Adicionar peso`,"weight.weight":`Peso`,"weight.addButton":`Adicionar Peso`,"weight.listTitle":`Registros de Peso`,"weight.empty":`Nenhum registro de peso ainda.`,"body.description":`Acompanhe medidas corporais localmente com registros editáveis.`,"body.edit":`Editar medidas`,"body.add":`Adicionar medidas`,"body.chest":`Peito`,"body.waist":`Cintura`,"body.hips":`Quadril`,"body.arm":`Braço`,"body.thigh":`Coxa`,"body.addButton":`Adicionar Medidas`,"body.listTitle":`Registros de Medidas`,"body.empty":`Nenhuma medida corporal ainda.`,"medication.description":`Registre data, dose, local e notas para referência local.`,"medication.edit":`Editar aplicação`,"medication.add":`Adicionar aplicação`,"medication.doseAmount":`Dose`,"medication.site":`Local`,"medication.notSpecified":`Não especificado`,"medication.abdomen":`Abdômen`,"medication.thigh":`Coxa`,"medication.upperArm":`Braço`,"medication.addButton":`Adicionar Aplicação`,"medication.listTitle":`Histórico de Aplicações`,"medication.empty":`Nenhuma aplicação de medicação ainda.`,"habit.quickActions":`Ações Rápidas`,"habit.meal":`Refeição`,"habit.water":`Água`,"habit.sleep":`Sono`,"habit.steps":`Passos`,"habit.medication":`Medicação`,"habit.customAmount":`Quantidade personalizada (mL)`,"habit.hours":`Horas`,"habit.minutes":`Minutos`,"habit.stepsCount":`Passos`,"habit.todaysSteps":`Passos de Hoje`,"habit.sleepQuestion":`Quantas horas você dormiu?`,"habit.sleepGoalHint":`Sua meta de sono é configurada nas Configurações.`,"fab.registerMeal":`Registrar Refeição`,"fab.favorites":`Favoritos`,"fab.mealPlans":`Planos de Refeição`,"fab.foodLibrary":`Biblioteca de Alimentos`,"nutriIa.title":`Nutri IA+`,"nutriIa.description":`Cole seu HWP_FOOD abaixo.`,"nutriIa.placeholder":`Cole o HWP_FOOD aqui...`,"nutriIa.validDetected":`HWP_FOOD válido detectado.`,"nutriIa.invalidMessage":`Este conteúdo não é um HWP_FOOD válido. Use o botão de ajuda abaixo para aprender como gerar um.`,"nutriIa.helpLink":`Como eu gero um HWP_FOOD?`,"nutriIa.helpIntro":`O Health Weight Pro usa um formato padronizado de nutrição chamado HWP_FOOD. Você pode gerá-lo usando qualquer assistente de IA.`,"nutriIa.helpOtherAssistants":`Outros assistentes de IA`,"nutriIa.helpStep1":`Descreva sua refeição para o seu assistente de IA preferido.`,"nutriIa.helpStep2":`Peça para converter a refeição em HWP_FOOD.`,"nutriIa.helpStep3":`Copie o HWP_FOOD gerado.`,"nutriIa.helpStep4":`Cole no Nutri IA+.`,"nutriIa.copyPrompt":`Copiar Prompt`,"nutriIa.promptCopiedTitle":`Copiado!`,"nutriIa.promptCopiedMessage":`O prompt do Nutri IA+ está pronto para colar no seu assistente de IA.`,"nutriIa.promptCopyFailedTitle":`Não foi possível copiar`,"nutriIa.promptCopyFailedMessage":`Copie o prompt manualmente.`,"nutriIa.importButton":`Importar`,"nutriIa.imported":`Importado`,"nutriIa.mealLabel":`Refeição`,"nutriIa.mealSlotLabel":`Horário da Refeição`,"nutriIa.originLabel":`Origem`,"toast.mealImported.title":`Refeição Importada`,"toast.mealImported.message":`Sua refeição foi adicionada com sucesso.`,"toast.favoriteRegistered.title":`Refeição Registrada`,"toast.favoriteRegistered.message":`Sua refeição favorita foi adicionada ao diário de hoje.`,"toast.mealPlanRegistered.title":`Plano de Refeição Registrado`,"toast.mealPlanRegistered.message":`Todas as refeições do plano foram adicionadas ao diário de hoje.`,"nutriIa.saveAsFavoritePrompt":`Quer registrar essa refeição em um toque da próxima vez?`,"favorites.description":`Salve suas refeições favoritas para registro em um toque.`,"favorites.emptyTitle":`Você ainda não tem Refeições Favoritas.`,"favorites.emptyHint":`Crie sua primeira refeição favorita para agilizar o registro de refeições.`,"favorites.createButton":`Criar Refeição Favorita`,"favorites.createFavorite":`Criar Refeição Favorita`,"favorites.editFavorite":`Editar Refeição Favorita`,"favorites.searchPlaceholder":`Buscar refeições favoritas...`,"favorites.allCategories":`Todas as Categorias`,"favorites.category":`Categoria`,"favorites.category.custom":`Personalizado`,"favorites.sortLabel":`Ordenar por`,"favorites.sort.mostUsed":`Mais Usadas`,"favorites.sort.recentlyUsed":`Usadas Recentemente`,"favorites.sort.alphabetical":`Ordem Alfabética`,"favorites.foodsCount":`{count} alimentos`,"favorites.noResults":`Nenhuma refeição favorita corresponde à sua busca.`,"favorites.mealName":`Nome da Refeição`,"favorites.namePlaceholder":`Tigela proteica no café da manhã, shake pós-treino...`,"favorites.nextButton":`Próximo`,"favorites.searchFoodPlaceholder":`Buscar na Biblioteca de Alimentos...`,"favorites.addFoodButton":`Adicionar Alimento`,"favorites.addedFoods":`Alimentos Adicionados`,"favorites.noFoodsAddedYet":`Nenhum alimento adicionado ainda.`,"favorites.continueToPreview":`Revisar`,"favorites.saveFavorite":`Salvar Refeição Favorita`,"favorites.saveAsFavorite":`Salvar como Refeição Favorita`,"favorites.deleteConfirmTitle":`Excluir Refeição Favorita`,"favorites.deleteConfirmMessage":`Tem certeza de que deseja excluir {name}? Esta ação não pode ser desfeita.`,"mealPlans.description":`Organize suas Refeições Favoritas em planos alimentares diários reutilizáveis.`,"mealPlans.emptyTitle":`Nenhum Plano de Refeição ainda.`,"mealPlans.emptyHint":`Crie seu primeiro plano de refeição.`,"mealPlans.createButton":`Criar Plano de Refeição`,"mealPlans.createPlan":`Criar Plano de Refeição`,"mealPlans.editPlan":`Editar Plano de Refeição`,"mealPlans.searchPlaceholder":`Buscar planos de refeição...`,"mealPlans.noResults":`Nenhum plano de refeição corresponde à sua busca.`,"mealPlans.mealsCount":`{count} refeições`,"mealPlans.planName":`Nome do Plano`,"mealPlans.namePlaceholder":`Semana de corte, dia de treino...`,"mealPlans.planDescription":`Descrição`,"mealPlans.descriptionPlaceholder":`Notas opcionais sobre este plano`,"mealPlans.searchFavoritesPlaceholder":`Buscar Refeições Favoritas...`,"mealPlans.addedMeals":`Refeições Adicionadas`,"mealPlans.noMealsAddedYet":`Nenhuma refeição adicionada ainda.`,"mealPlans.assignSlot":`Horário da Refeição`,"mealPlans.addToPlanButton":`Adicionar ao Plano`,"mealPlans.savePlanButton":`Salvar Plano de Refeição`,"mealPlans.deleteConfirmTitle":`Excluir Plano de Refeição`,"mealPlans.deleteConfirmMessage":`Tem certeza de que deseja excluir {name}? Esta ação não pode ser desfeita.`,"foodLibrary.description":`Navegue e reutilize alimentos que você já registrou.`,"foodLibrary.emptyTitle":`Sua Biblioteca de Alimentos está vazia.`,"foodLibrary.emptyHint":`Comece adicionando alimentos para agilizar futuros registros de refeições.`,"foodLibrary.addFood":`Adicionar Alimento`,"foodLibrary.editFood":`Editar Alimento`,"foodLibrary.searchPlaceholder":`Buscar alimentos...`,"foodLibrary.allCategories":`Todas as Categorias`,"foodLibrary.category":`Categoria`,"foodLibrary.category.fruits":`Frutas`,"foodLibrary.category.vegetables":`Vegetais`,"foodLibrary.category.legumes":`Leguminosas`,"foodLibrary.category.grains":`Grãos`,"foodLibrary.category.roots":`Raízes e Tubérculos`,"foodLibrary.category.nuts":`Castanhas e Sementes`,"foodLibrary.category.meat":`Carne`,"foodLibrary.category.chicken":`Frango`,"foodLibrary.category.fish":`Peixe`,"foodLibrary.category.eggs":`Ovos`,"foodLibrary.category.dairy":`Laticínios`,"foodLibrary.category.bread":`Pão`,"foodLibrary.category.beverages":`Bebidas`,"foodLibrary.category.supplements":`Suplementos`,"foodLibrary.category.desserts":`Sobremesas`,"foodLibrary.category.snacks":`Lanches`,"foodLibrary.category.others":`Outros`,"foodLibrary.foodName":`Nome do Alimento`,"foodLibrary.servingSize":`Tamanho da Porção`,"foodLibrary.servingUnit":`Unidade da Porção`,"foodLibrary.unit.unit":`unidade`,"foodLibrary.unit.slice":`fatia`,"foodLibrary.unit.scoop":`dose`,"foodLibrary.unit.cup":`xícara`,"foodLibrary.unit.tablespoon":`colher de sopa`,"foodLibrary.unit.serving":`porção`,"foodLibrary.noResults":`Nenhum alimento corresponde à sua busca.`,"foodLibrary.chooseQuantity":`Escolha a Quantidade`,"foodLibrary.quantity":`Quantidade`,"foodLibrary.addToMeal":`Adicionar à Refeição`,"foodLibrary.deleteConfirmTitle":`Excluir Alimento`,"foodLibrary.deleteConfirmMessage":`Tem certeza de que deseja excluir {name}? Esta ação não pode ser desfeita.`,"toast.water.title":`Excelente!`,"toast.water.message":`Você atingiu sua meta de hidratação de hoje.`,"toast.protein.title":`Muito bem!`,"toast.protein.message":`Sua meta de proteína foi concluída.`,"toast.calories.title":`Perfeito!`,"toast.calories.message":`Sua meta de calorias foi alcançada.`,"toast.steps.title":`Parabéns!`,"toast.steps.message":`Você atingiu sua meta de passos de hoje.`,"toast.sleep.title":`Bem descansado!`,"toast.sleep.message":`Você atingiu sua meta de sono.`,"toast.allGoals.title":`Excepcional!`,"toast.allGoals.message":`Você completou todas as suas metas de saúde de hoje.`,"settings.description":`Gerencie preferências locais deste aplicativo offline.`,"settings.preferences":`Preferências`,"settings.language":`Idioma`,"settings.theme":`Tema`,"settings.units":`Unidades`,"settings.weightUnit":`Peso`,"settings.measurementUnit":`Medidas`,"settings.dateFormat":`Formato de data`,"settings.unitsAutomatic":`As unidades seguem automaticamente o idioma selecionado.`,"settings.save":`Salvar Configurações`,"settings.backupExport":`Exportar Backup`,"settings.backupImport":`Importar Backup`,"settings.profile":`Perfil do Usuario`,"settings.personalInfo":`Informacoes Pessoais`,"settings.name":`Nome`,"settings.sex":`Sexo`,"settings.sexFemale":`Feminino`,"settings.sexMale":`Masculino`,"settings.sexOther":`Outro`,"settings.sexNotSet":`Prefiro nao informar`,"settings.birthDate":`Data de nascimento`,"settings.height":`Altura`,"settings.goal":`Objetivo`,"settings.goalLoseWeight":`Perder Peso`,"settings.goalMaintainWeight":`Manter Peso`,"settings.goalGainMuscle":`Ganhar Massa`,"settings.activityLevel":`Nivel de Atividade`,"settings.activitySedentary":`Sedentario`,"settings.activityLight":`Leve`,"settings.activityModerate":`Moderado`,"settings.activityIntense":`Intenso`,"settings.dailyGoals":`Metas Diarias`,"settings.weightGoals":`Peso`,"settings.currentWeight":`Peso Atual`,"settings.targetWeight":`Peso Alvo`,"settings.nutritionGoals":`Nutricao`,"settings.calories":`Calorias`,"settings.protein":`Proteina`,"settings.carbohydrates":`Carboidratos`,"settings.fat":`Gordura`,"settings.fiber":`Fibra`,"settings.hydration":`Hidratacao`,"settings.dailyWaterGoal":`Meta Diaria de Agua`,"settings.sleep":`Sono`,"settings.dailySleepGoal":`Meta Diaria de Sono`,"settings.steps":`Passos`,"settings.dailyStepGoal":`Meta Diaria de Passos`,"settings.medication":`Medicacao`,"settings.enableMedicationTracking":`Ativar acompanhamento de medicação`,"settings.medicationName":`Nome da Medicação`,"settings.administrationType":`Tipo de Administração`,"settings.administration.injection":`Injeção`,"settings.administration.tablet":`Comprimido`,"settings.administration.capsule":`Cápsula`,"settings.administration.drops":`Gotas`,"settings.administration.cream":`Creme`,"settings.administration.other":`Outro`,"settings.frequency":`Frequência`,"settings.frequency.daily":`Diária`,"settings.frequency.weekly":`Semanal`,"settings.frequency.every-2-weeks":`A Cada 2 Semanas`,"settings.frequency.monthly":`Mensal`,"settings.frequency.custom":`Personalizada`,"settings.defaultDose":`Dose Padrão`,"settings.doseUnit":`Unidade de Dose`,"settings.doseUnit.mg":`mg`,"settings.doseUnit.mcg":`mcg`,"settings.doseUnit.mL":`mL`,"settings.doseUnit.IU":`UI`,"settings.doseUnit.units":`Unidades`,"settings.doseUnit.other":`Outro`,"settings.applicationDay":`Dia de Aplicação`,"settings.medicationNotes":`Notas Opcionais`,"settings.dashboardPreferences":`Preferencias do Painel`,"settings.visibleMealSlots":`Horários de Refeição Visíveis`,"settings.visibleMealSlotsHint":`Escolha quais horários de refeição opcionais aparecem em todo o aplicativo. Café da manhã, almoço e jantar estão sempre visíveis.`,"day.monday":`Segunda-feira`,"day.tuesday":`Terca-feira`,"day.wednesday":`Quarta-feira`,"day.thursday":`Quinta-feira`,"day.friday":`Sexta-feira`,"day.saturday":`Sabado`,"day.sunday":`Domingo`,"backup.description":`Exporte e importe dados locais do aplicativo em JSON.`,"backup.export":`Exportar`,"backup.exportJson":`Exportar JSON`,"backup.import":`Importar`,"backup.importJson":`Importar JSON`,"backup.json":`JSON do Backup`,"backup.placeholder":`Cole o JSON exportado aqui`,"message.recordSaved":`Registro salvo.`,"message.recordDeleted":`Registro excluído.`,"message.mealImported":`Refeição importada.`,"message.foodAddedToMeal":`Refeição adicionada da Biblioteca de Alimentos.`,"message.favoriteRegistered":`Refeição favorita registrada para hoje.`,"message.mealPlanRegistered":`Plano de refeição registrado para hoje.`,"message.settingsSaved":`Configurações salvas.`,"message.settingsReset":`Configurações redefinidas.`,"message.backupExported":`Backup exportado.`,"message.backupImported":`Backup importado: {stores}.`,"message.noStores":`nenhum armazenamento`,"error.backupInvalidJson":`O JSON do backup é inválido.`,"error.backupUnknownStores":`O backup contém armazenamentos desconhecidos: {stores}.`,"error.backupUnsupportedFormat":`Formato de backup não suportado.`,"error.backupNoStores":`O backup não contém armazenamentos.`,"error.backupStoreRecords":`Cada armazenamento do backup deve conter uma lista de registros.`,"validation.dateRequired":`A data é obrigatória.`,"validation.mealNameRequired":`O nome da refeição é obrigatório.`,"validation.weightPositive":`O peso deve ser maior que zero.`,"validation.measurementRequired":`Informe pelo menos uma medida.`,"validation.dosePositive":`A dose deve ser maior que zero.`,"validation.foodNameRequired":`O nome do alimento é obrigatório.`,"validation.servingSizePositive":`O tamanho da porção deve ser maior que zero.`,"validation.favoriteMealNameRequired":`O nome da refeição favorita é obrigatório.`,"validation.favoriteMealItemsRequired":`Adicione pelo menos um alimento à refeição favorita.`,"validation.mealPlanNameRequired":`O nome do plano de refeição é obrigatório.`,"validation.mealPlanMealsRequired":`Adicione pelo menos uma refeição ao plano.`}});function w(e){return e===`pt-BR`?`pt-BR`:`en`}function xe(e){return[`light`,`dark`,`system`].includes(e)?e:`system`}function Se(e){return ye[w(e)]}function Ce(e={}){let t=w(e.language);return{language:t,units:Se(t),t(e,n={}){return we(t,e,n)},formatDate(e){return Te(e,t)},formatNumber(e,n={}){return Ee(e,t,n)}}}function we(e,t,n={}){let r=(be[w(e)]??be.en)[t]??be.en[t]??t;return Object.entries(n).reduce((e,[t,n])=>e.replaceAll(`{${t}}`,String(n??``)),r)}function Te(e,t){if(!e)return``;let[n,r,i]=String(e).slice(0,10).split(`-`);return!n||!r||!i?String(e):w(t)===`pt-BR`?`${i}/${r}/${n}`:`${r}/${i}/${n}`}function Ee(e,t,n={}){let r=Number(e);return Number.isFinite(r)?new Intl.NumberFormat(w(t),{maximumFractionDigits:n.maximumFractionDigits??1,minimumFractionDigits:n.minimumFractionDigits??0}).format(r):``}function De({language:e,theme:t}={}){let n=w(e),r=xe(t);document.documentElement.lang=n,document.documentElement.dataset.theme=r,document.documentElement.style.colorScheme=r===`system`?`light dark`:r}function T(e,t){return[...e].sort((e,n)=>String(n[t]).localeCompare(String(e[t])))}function Oe(e,t){return[...e].sort((e,n)=>String(e[t]).localeCompare(String(n[t])))}function E(e){if(e==null||e===``)return null;let t=Number(e);return Number.isFinite(t)?t:null}function D(){return new Date().toISOString().slice(0,10)}function O(){return new Date().toISOString()}var ke=[`water`,`sleep`,`steps`,`protein`,`calories`],Ae=class{constructor({eventBus:e,logger:t,modules:n,persistence:r,router:i,storage:a}){this.eventBus=e,this.logger=t,this.modules=n,this.persistence=r,this.router=i,this.storage=a,this.celebratedGoals=new Set,this.justAchievedKeys=[],this.allGoalsJustAchieved=!1}async initialize(){await this.storage.initialize(),await Promise.all(Object.values(this.modules).map(e=>e.initialize())),this.#i(),De(this.getSettings()),this.updateDocumentTitle(this.router.getCurrentRoute()),this.eventBus.publish(`app:initialized`)}getState(){let e=this.router.getCurrentRoute(),t=this.getI18nContext();return{appName:C,appVersion:`3.0`,currentRoute:this.translateRoute(e,t),currentModuleState:this.getModuleState(e.moduleKey,t),i18n:t,routes:this.getTranslatedRoutes(t),fab:this.getFabState(t)}}navigate(e){this.modules.fab?.handleAction(`close`),this.router.navigate(e)}getFabState(e=this.getI18nContext()){return{...this.modules.fab?.getState(),today:this.modules[`daily-habits`]?.getState()?.today??null,app:{appName:C,appVersion:`3.0`,i18n:e,language:e.language,settings:this.getSettings(),units:e.units}}}onRouteChange(e){return this.router.onChange(t=>{this.updateDocumentTitle(t),e(this.translateRoute(t,this.getI18nContext()))})}getModuleState(e,t=this.getI18nContext()){let n=this.modules[e]?.getState()??{};return{...n,justAchievedKeys:e===`dashboard`?this.justAchievedKeys:[],allGoalsJustAchieved:e===`dashboard`&&this.allGoalsJustAchieved,app:{appName:C,appVersion:`3.0`,i18n:t,language:t.language,settings:this.getSettings(),units:t.units},backupStatus:e===`settings`?this.modules[`backup-restore`]?.getState()??{}:n.backupStatus,developer:e===`settings`?this.modules.developer?.getState()??{}:void 0}}async handleAction(e,t,n={}){let r=this.modules[e];if(!r){this.logger.warn(`Unknown module action ignored.`,{moduleKey:e,action:t});return}await r.handleAction(t,n),await this.#e(e,t),this.#a(),De(this.getSettings()),this.updateDocumentTitle(this.router.getCurrentRoute())}getSettings(){return this.modules.settings?.getState().settings??{}}getI18nContext(){return Ce(this.getSettings())}getTranslatedRoutes(e){let t=this.getSettings();return this.router.getRoutes().filter(e=>e.id!==`medication`||t.medication?.enabled!==!1).map(t=>this.translateRoute(t,e))}translateRoute(e,t){return{...e,label:e.labelKey?t.t(e.labelKey):e.label,section:e.sectionKey?t.t(e.sectionKey):e.section,href:this.router.toHref(e.path)}}updateDocumentTitle(e){let t=this.getI18nContext(),n=this.translateRoute(e,t);document.title=`${n.label} | ${C}`}async#e(e,t){if(e===`backup-restore`&&t===`import`){await Promise.all(Object.values(this.modules).map(e=>e.initialize()));return}await this.modules.dashboard?.refresh?.(),e!==`meal-journal`&&await this.modules[`meal-journal`]?.initialize?.(),e!==`food-library`&&await this.modules[`food-library`]?.load?.(),e!==`favorites`&&await this.modules.favorites?.load?.(),e!==`meal-plans`&&await this.modules[`meal-plans`]?.load?.(),e!==`settings`&&await this.modules.settings?.initialize?.()}#t(){let e=this.modules.dashboard?.getState()?.summary??{},t=this.getSettings(),n=e.dailyHabits??{},r=t.dashboardCards??{},i={water:{current:n.waterMl??0,goal:t.waterGoal??0},sleep:{current:n.sleepMinutes??0,goal:(t.sleepGoal??0)*60},steps:{current:n.steps??0,goal:t.stepGoal??0},protein:{current:0,goal:t.proteinGoal??0},calories:{current:0,goal:t.calorieGoal??0}};return ke.map(e=>{let{current:t,goal:n}=i[e];return{key:e,enabled:(r[e]??!0)&&n>0,achieved:n>0&&t>=n}})}#n(){return this.#t().filter(e=>e.achieved).map(e=>e.key)}#r(){let e=this.#t().filter(e=>e.enabled);return e.length>0&&e.every(e=>e.achieved)}#i(){let e=D();this.#n().forEach(t=>this.celebratedGoals.add(`${t}:${e}`)),this.#r()&&this.celebratedGoals.add(`all:${e}`)}#a(){let e=D();this.justAchievedKeys=this.#n().filter(t=>{let n=`${t}:${e}`;return this.celebratedGoals.has(n)?!1:(this.celebratedGoals.add(n),this.eventBus.publish(`dashboard:goal-achieved`,{key:t}),!0)});let t=`all:${e}`;this.allGoalsJustAchieved=!this.celebratedGoals.has(t)&&this.#r(),this.allGoalsJustAchieved&&(this.celebratedGoals.add(t),this.eventBus.publish(`dashboard:all-goals-achieved`))}},je=Object.freeze({en:`You are a nutritional assistant.

Convert the following meal into the official Health Weight Pro format.

Return ONLY the HWP_FOOD block below, filled in with your best nutritional estimate.

Do NOT explain.

Do NOT use Markdown.

Do NOT include comments.

Official format:

HWP_FOOD
slot=breakfast, lunch, dinner, snack, or meal
name=
calories=
protein=
carbs=
fat=
fiber=

Meal:`,"pt-BR":`Você é um assistente nutricional.

Converta a refeição abaixo para o formato oficial do Health Weight Pro.

Responda APENAS com o bloco HWP_FOOD abaixo, preenchido com sua melhor estimativa nutricional.

NÃO explique.

NÃO use Markdown.

NÃO inclua comentários.

Formato oficial:

HWP_FOOD
slot=breakfast, lunch, dinner, snack, or meal
name=
calories=
protein=
carbs=
fat=
fiber=

Refeição:`});function Me(e){return je[e]??je.en}var Ne=[`breakfast`,`lunch`,`dinner`],k=[`morningSnack`,`afternoonSnack`,`preWorkout`,`postWorkout`,`supper`],Pe=[...Ne,...k];function Fe(e={}){let t=k.filter(t=>e.mealSlots?.[t]);return[...Ne,...t]}function A(e){return Pe.includes(e)?`mealSlot.${e}`:`meal.${e}`}var Ie=/^HWP_FOOD\s*$/i,Le=/^([a-zA-Z]+)\s*=\s*(.*)$/,Re=[...Pe,`snack`,`meal`];function ze(e){let t=String(e??``).split(/\r?\n/),n=t.findIndex(e=>Ie.test(e.trim()));if(n===-1)return{valid:!1};let r={},i=[t[n]];for(let e=n+1;e<t.length;e+=1){let n=t[e],a=n.trim();if(!a){if(Object.keys(r).length>0)break;continue}let o=a.match(Le);if(!o)break;r[o[1].trim().toLowerCase()]=o[2].trim(),i.push(n)}let a=String(r.name??``).trim(),o=Be(r.slot),s=j(r.calories),c=j(r.protein),l=j(r.carbs??r.carbohydrates),u=j(r.fat),d=j(r.fiber)??0;return!a||s===null||c===null||l===null||u===null?{valid:!1}:{valid:!0,data:{mealType:o,name:a,calories:s,protein:c,carbs:l,fat:u,fiber:d},raw:i.join(`
`)}}function Be(e){let t=String(e??``).trim().toLowerCase();return Re.find(e=>e.toLowerCase()===t)??`meal`}function j(e){if(e==null||e===``)return null;let t=Number(e);return Number.isFinite(t)&&t>=0?t:null}function Ve({root:e,viewModel:t}){let n=t.getState();e.innerHTML=`
    <main class="app-shell">
      <aside class="app-shell__sidebar" aria-label="${n.i18n.t(`aria.primaryNavigation`)}">
        ${We(n)}
        ${Ge(n.routes,n.currentRoute)}
      </aside>
      <section class="app-shell__workspace">
        <header class="app-shell__topbar">
          ${We(n)}
          <nav class="app-shell__mobile-nav" aria-label="${n.i18n.t(`aria.mobileNavigation`)}">
            ${Ke(n.routes,n.currentRoute)}
          </nav>
        </header>
        <section class="app-shell__content" aria-live="polite">
          ${Ye(n.currentRoute,n.currentModuleState)}
        </section>
      </section>
      <div class="app-shell__fab-region">
        ${tt(n.fab,n.routes,n.i18n)}
      </div>
    </main>
  `,ut(e.querySelector(`.app-shell__fab-region`),n.i18n),n.currentRoute.afterRender?.(e.querySelector(`.app-shell__content`),n.currentModuleState),e.addEventListener(`click`,async n=>{let r=n.target.closest(`[data-route]`);if(r){n.preventDefault(),r.classList.contains(`app-shell__brand`)&&(await t.handleAction(`developer`,`tapLogo`,{}),t.modules.developer?.getState().justEnabled&&S({icon:`🛠`,title:t.getI18nContext().t(`developer.enabledTitle`),message:t.getI18nContext().t(`developer.enabledMessage`)})),t.navigate(r.dataset.route);return}if(n.target.closest(`[data-copy-prompt]`)){n.preventDefault(),await Qe(t.getI18nContext());return}if(n.target.closest(`[data-export-logs]`)){n.preventDefault(),await $e(t);return}let i=n.target.closest(`button[data-action], [role="button"][data-action]`);if(!i||i.type===`submit`)return;n.preventDefault();let a=Xe(i,t),o=i.dataset.action;if(await t.handleAction(a,o,{...i.dataset}),a===`meal-journal`&&o===`importHwpFood`){await et({root:e,viewModel:t,importButton:i});return}if(a===`favorites`&&o===`startFromImportedMeal`){t.navigate(`/favorites`),M({root:e,state:t.getState(),route:t.getState().currentRoute});return}a===`favorites`&&o===`register`&&S({icon:`⭐`,title:t.getI18nContext().t(`toast.favoriteRegistered.title`),message:t.getI18nContext().t(`toast.favoriteRegistered.message`)}),a===`meal-plans`&&o===`register`&&S({icon:`🍽`,title:t.getI18nContext().t(`toast.mealPlanRegistered.title`),message:t.getI18nContext().t(`toast.mealPlanRegistered.message`)}),M({root:e,state:t.getState(),route:t.getState().currentRoute})}),e.addEventListener(`submit`,async n=>{let r=n.target.closest(`form[data-action]`);r&&(n.preventDefault(),await t.handleAction(Xe(r,t),r.dataset.action,Ze(r)),M({root:e,state:t.getState(),route:t.getState().currentRoute}))}),e.addEventListener(`keydown`,e=>{if(e.key!==`Enter`&&e.key!==` `)return;let t=e.target.closest(`[role="button"][tabindex]`);t&&(e.preventDefault(),t.click())}),document.addEventListener(`keydown`,async n=>{n.key===`Escape`&&await Ue({root:e,viewModel:t})}),t.onRouteChange(n=>{M({root:e,state:t.getState(),route:n})})}var He=Object.freeze({favorites:`closeDialog`,"food-library":`closeDialog`,"meal-plans":`closeDialog`});async function Ue({root:e,viewModel:t}){let n=t.getState();if(n.fab?.isOpen){await t.handleAction(`fab`,`close`,{}),M({root:e,state:t.getState(),route:t.getState().currentRoute});return}let r=n.currentRoute.moduleKey,i=n.currentModuleState??{};if(r===`settings`&&i.developer?.confirmingAction){await t.handleAction(`developer`,`cancelConfirm`,{}),M({root:e,state:t.getState(),route:t.getState().currentRoute});return}i.activeDialog&&He[r]&&(await t.handleAction(r,He[r],{}),M({root:e,state:t.getState(),route:t.getState().currentRoute}))}function We(e){return`
    <a class="app-shell__brand" href="${e.routes.find(e=>e.path===`/`)?.href??`/Health-Weight-Pro/`}" data-route="/">
      <img class="app-shell__logo" src="/Health-Weight-Pro/icons/logo.png" alt="" aria-hidden="true" />
      <span class="app-shell__brand-copy">
        <span class="app-shell__brand-text">${e.appName}</span>
        <span class="app-shell__brand-version">${e.i18n.t(`app.version`,{version:e.appVersion})}</span>
      </span>
    </a>
  `}function Ge(e,t){let n=e.filter(e=>!e.hidden);return[...new Set(n.map(e=>e.section))].map(e=>`
        <div class="app-shell__nav-group">
          <p class="app-shell__nav-heading">${e}</p>
          <nav class="app-shell__links" aria-label="${e}">
            ${n.filter(t=>t.section===e).map(e=>qe(e,t)).join(``)}
          </nav>
        </div>
      `).join(``)}function Ke(e,t){return e.filter(e=>!e.hidden).map(e=>qe(e,t)).join(``)}function qe(e,t){let n=e.path===t.path;return`
    <a
      class="app-shell__link${n?` app-shell__link--active`:``}"
      href="${e.href}"
      data-route="${e.path}"
      ${n?`aria-current="page"`:``}
    >
      <span class="app-shell__link-mark" aria-hidden="true">${Je(e.id)}</span>
      <span>${e.label}</span>
    </a>
  `}function Je(e){let t={dashboard:`<path d="M3 13h8V3H3v10Z"></path><path d="M13 21h8V11h-8v10Z"></path><path d="M13 3v6h8V3h-8Z"></path><path d="M3 21h8v-6H3v6Z"></path>`,"meal-journal":`<path d="M4 3v7a4 4 0 0 0 4 4v7"></path><path d="M8 3v18"></path><path d="M12 3v7a4 4 0 0 1-4 4"></path><path d="M17 3v18"></path><path d="M17 3c2.5 2 3.5 4.5 3 8h-3"></path>`,"weight-tracking":`<path d="M12 3v3"></path><path d="M6 7h12l3 12H3L6 7Z"></path><path d="m9 12 3 3 3-3"></path>`,"body-measurements":`<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M6 7v10"></path><path d="M10 7v5"></path><path d="M14 7v10"></path><path d="M18 7v5"></path>`,medication:`<path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8 20l-4-4L15 5l4 4Z"></path><path d="m9 7 8 8"></path><path d="m4 20-2 2"></path>`,settings:`<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"></path>`,"backup-restore":`<path d="M4 7c0-2 3.6-4 8-4s8 2 8 4-3.6 4-8 4-8-2-8-4Z"></path><path d="M4 7v5c0 2 3.6 4 8 4s8-2 8-4V7"></path><path d="M4 12v5c0 2 3.6 4 8 4s8-2 8-4v-5"></path>`};return`
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      ${t[e]??t.dashboard}
    </svg>
  `}function Ye(e,t){return e.render(t)}function M({root:e,state:t,route:n}){let r=e.querySelector(`.app-shell__content`),i=e.querySelector(`.app-shell__sidebar`),a=e.querySelector(`.app-shell__mobile-nav`),o=e.querySelector(`.app-shell__fab-region`);r.innerHTML=Ye(n,t.currentModuleState),n.afterRender?.(r,t.currentModuleState),i.setAttribute(`aria-label`,t.i18n.t(`aria.primaryNavigation`)),a.setAttribute(`aria-label`,t.i18n.t(`aria.mobileNavigation`)),i.innerHTML=`${We(t)}${Ge(t.routes,n)}`,a.innerHTML=Ke(t.routes,n),o.innerHTML=tt(t.fab,t.routes,t.i18n),ut(o,t.i18n)}function Xe(e,t){return e.dataset.module||t.getState().currentRoute.moduleKey}function Ze(e){return Object.fromEntries(new FormData(e).entries())}async function Qe(e){try{await navigator.clipboard.writeText(Me(e.language)),S({icon:`📋`,title:e.t(`nutriIa.promptCopiedTitle`),message:e.t(`nutriIa.promptCopiedMessage`)})}catch{S({icon:`⚠️`,title:e.t(`nutriIa.promptCopyFailedTitle`),message:e.t(`nutriIa.promptCopyFailedMessage`)})}}async function $e(e){let t=e.getI18nContext();try{let n=e.logger.getEntries(),r=e.modules.developer?.getState(),i={exportedAt:new Date().toISOString(),versions:r?.versions??{},entries:n};await navigator.clipboard.writeText(JSON.stringify(i,null,2)),S({icon:`📋`,title:t.t(`developer.logsExportedTitle`),message:t.t(`developer.logsExportedMessage`)})}catch{S({icon:`⚠️`,title:t.t(`nutriIa.promptCopyFailedTitle`),message:t.t(`nutriIa.promptCopyFailedMessage`)})}}async function et({root:e,viewModel:t,importButton:n}){let r=t.getI18nContext();S({icon:`✔`,title:r.t(`toast.mealImported.title`),message:r.t(`toast.mealImported.message`)}),await t.handleAction(`fab`,`showImportSuccess`,{...n.dataset}),M({root:e,state:t.getState(),route:t.getState().currentRoute})}function tt(e={},t=[],n){let{isOpen:r,activeDialog:i,today:a,lastImportedMeal:o}=e,s=e.app?.settings??{};return`
    <button type="button" class="fab-button" data-module="fab" data-action="open" aria-label="${n.t(`aria.quickActions`)}">
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>
    </button>
    ${r?nt({activeDialog:i,today:a,settings:s,routes:t,lastImportedMeal:o,i18n:n}):``}
  `}function nt({activeDialog:e,today:t,settings:n,routes:r,lastImportedMeal:i,i18n:a}){return`
    <button type="button" class="bottom-sheet-overlay" data-module="fab" data-action="close" aria-label="${a.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${a.t(`aria.quickActions`)}">
      ${rt({activeDialog:e,today:t,settings:n,routes:r,lastImportedMeal:i,i18n:a})}
    </div>
  `}function rt({activeDialog:e,today:t,settings:n,routes:r,lastImportedMeal:i,i18n:a}){return e===`water`?dt(t,n,a):e===`sleep`?pt(t,n,a):e===`steps`?mt(t,n,a):e===`meal-register`?at(r,a):e===`nutri-ia`?ot(a):e===`nutri-ia-help`?st(a):e===`nutri-ia-success`?ct(i,a):it(r,a)}function it(e,t){let n=e.find(e=>e.id===`medication`);return`
    <ul class="bottom-sheet__options">
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="meal-register">
          <span aria-hidden="true">🍽</span><span>${t.t(`habit.meal`)}</span>
        </button>
      </li>
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="water">
          <span aria-hidden="true">💧</span><span>${t.t(`habit.water`)}</span>
        </button>
      </li>
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="sleep">
          <span aria-hidden="true">😴</span><span>${t.t(`habit.sleep`)}</span>
        </button>
      </li>
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="steps">
          <span aria-hidden="true">👣</span><span>${t.t(`habit.steps`)}</span>
        </button>
      </li>
      ${n?`<li><a class="bottom-sheet__option" href="${n.href}" data-route="${n.path}"><span aria-hidden="true">💉</span><span>${t.t(`habit.medication`)}</span></a></li>`:``}
    </ul>
  `}function N(e,t,n){return`
    <div class="bottom-sheet__header">
      <button type="button" class="bottom-sheet__back" data-module="fab" data-action="closeDialog" aria-label="${n.t(`common.back`)}">←</button>
      <h2><span aria-hidden="true">${e}</span> ${n.t(t)}</h2>
      <button type="button" class="bottom-sheet__close" data-module="fab" data-action="close" aria-label="${n.t(`common.close`)}">×</button>
    </div>
  `}function at(e,t){let n=e.find(e=>e.id===`favorites`),r=e.find(e=>e.id===`meal-plans`),i=e.find(e=>e.id===`food-library`);return`
    ${N(`🍽`,`fab.registerMeal`,t)}
    <ul class="bottom-sheet__options">
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="nutri-ia">
          <span aria-hidden="true">✨</span><span>${t.t(`nutriIa.title`)}</span>
        </button>
      </li>
      ${n?`<li><a class="bottom-sheet__option" href="${n.href}" data-route="${n.path}"><span aria-hidden="true">⭐</span><span>${t.t(`fab.favorites`)}</span></a></li>`:``}
      ${r?`<li><a class="bottom-sheet__option" href="${r.href}" data-route="${r.path}"><span aria-hidden="true">🍽️</span><span>${t.t(`fab.mealPlans`)}</span></a></li>`:``}
      ${i?`<li><a class="bottom-sheet__option" href="${i.href}" data-route="${i.path}"><span aria-hidden="true">📚</span><span>${t.t(`fab.foodLibrary`)}</span></a></li>`:``}
    </ul>
  `}function ot(e){return`
    ${N(`✨`,`nutriIa.title`,e)}
    <p class="bottom-sheet__subtitle">${e.t(`nutriIa.description`)}</p>
    <textarea class="nutri-ia-textarea" data-nutri-ia-input rows="8" placeholder="${e.t(`nutriIa.placeholder`)}"></textarea>
    <div data-nutri-ia-preview></div>
    <div class="form-actions">
      <button type="button" data-nutri-ia-import data-module="meal-journal" data-action="importHwpFood" disabled>${e.t(`nutriIa.importButton`)}</button>
      <button type="button" data-module="fab" data-action="close">${e.t(`common.cancel`)}</button>
    </div>
    <button type="button" class="nutri-ia-help-link" data-module="fab" data-action="openDialog" data-dialog="nutri-ia-help">
      <span aria-hidden="true">❓</span> ${e.t(`nutriIa.helpLink`)}
    </button>
  `}function st(e){return`
    ${N(`✨`,`nutriIa.title`,e)}
    <p>${e.t(`nutriIa.helpIntro`)}</p>
    <p class="nutri-ia-help-examples">ChatGPT &middot; Claude &middot; Gemini &middot; Grok &middot; Copilot &middot; DeepSeek &middot; ${e.t(`nutriIa.helpOtherAssistants`)}</p>
    <ol class="nutri-ia-help-steps">
      ${[`helpStep1`,`helpStep2`,`helpStep3`,`helpStep4`].map(t=>`<li>${e.t(`nutriIa.${t}`)}</li>`).join(``)}
    </ol>
    <button type="button" class="nutri-ia-copy-prompt" data-copy-prompt>${e.t(`nutriIa.copyPrompt`)}</button>
  `}function ct(e,t){let n=e??{};return`
    ${N(`✔`,`toast.mealImported.title`,t)}
    <p class="bottom-sheet__subtitle">${t.t(`nutriIa.saveAsFavoritePrompt`)}</p>
    <div class="form-actions">
      <button
        type="button"
        data-module="favorites"
        data-action="startFromImportedMeal"
        data-meal-type="${y(n.mealType??`meal`)}"
        data-name="${y(n.name??``)}"
        data-calories="${y(n.calories??`0`)}"
        data-protein="${y(n.protein??`0`)}"
        data-carbs="${y(n.carbs??`0`)}"
        data-fat="${y(n.fat??`0`)}"
        data-fiber="${y(n.fiber??`0`)}"
      >⭐ ${t.t(`favorites.saveAsFavorite`)}</button>
      <button type="button" data-module="fab" data-action="close">${t.t(`common.close`)}</button>
    </div>
  `}function lt(e,t){return`
    <div class="nutri-ia-preview-card">
      <p class="nutri-ia-preview-status">✔ ${y(t.t(`nutriIa.validDetected`))}</p>
      <dl class="nutri-ia-preview-grid">
        <div><dt>${t.t(`nutriIa.mealLabel`)}</dt><dd>${y(e.name)}</dd></div>
        <div><dt>${t.t(`nutriIa.mealSlotLabel`)}</dt><dd>${y(t.t(A(e.mealType)))}</dd></div>
        <div><dt>${t.t(`settings.calories`)}</dt><dd>${t.formatNumber(e.calories)} kcal</dd></div>
        <div><dt>${t.t(`settings.protein`)}</dt><dd>${t.formatNumber(e.protein)} g</dd></div>
        <div><dt>${t.t(`settings.carbohydrates`)}</dt><dd>${t.formatNumber(e.carbs)} g</dd></div>
        <div><dt>${t.t(`settings.fat`)}</dt><dd>${t.formatNumber(e.fat)} g</dd></div>
        <div><dt>${t.t(`settings.fiber`)}</dt><dd>${t.formatNumber(e.fiber)} g</dd></div>
        <div><dt>${t.t(`nutriIa.originLabel`)}</dt><dd>✨ ${t.t(`nutriIa.title`)}</dd></div>
      </dl>
    </div>
  `}function ut(e,t){let n=e?.querySelector(`[data-nutri-ia-input]`);if(!n)return;let r=e.querySelector(`[data-nutri-ia-preview]`),i=e.querySelector(`[data-nutri-ia-import]`),a=()=>{if(!n.value.trim()){r.innerHTML=``,i.disabled=!0;return}let e=ze(n.value);if(!e.valid){r.innerHTML=`<p class="nutri-ia-preview-status nutri-ia-preview-status--invalid">${y(t.t(`nutriIa.invalidMessage`))}</p>`,i.disabled=!0;return}r.innerHTML=lt(e.data,t),i.disabled=!1,i.dataset.mealType=e.data.mealType,i.dataset.name=e.data.name,i.dataset.calories=String(e.data.calories),i.dataset.protein=String(e.data.protein),i.dataset.carbs=String(e.data.carbs),i.dataset.fat=String(e.data.fat),i.dataset.fiber=String(e.data.fiber),i.dataset.raw=e.raw};n.addEventListener(`input`,a),a()}function dt(e,t,n){let r=e?.waterMl??0,i=t.waterGoal??0;return`
    ${N(`💧`,`habit.water`,n)}
    <p class="bottom-sheet__progress">${n.formatNumber(r)} / ${n.formatNumber(i)} mL</p>
    <div class="quick-actions-grid">
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="250"><span aria-hidden="true">🥤</span> +250 mL</button>
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="500"><span aria-hidden="true">🥤</span> +500 mL</button>
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="750"><span aria-hidden="true">🥤</span> +750 mL</button>
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="1000"><span aria-hidden="true">🧴</span> +1 L</button>
    </div>
    <div class="quick-actions-grid quick-actions-grid--corrections">
      <button type="button" class="quick-actions-grid__correction" data-module="daily-habits" data-action="addWater" data-amount="-250"><span aria-hidden="true">➖</span> 250 mL</button>
      <button type="button" class="quick-actions-grid__correction" data-module="daily-habits" data-action="addWater" data-amount="-500"><span aria-hidden="true">➖</span> 500 mL</button>
    </div>
    <form class="module-form module-form--single" data-module="daily-habits" data-action="addWater">
      <label>
        <span>${n.t(`habit.customAmount`)}</span>
        <input name="amount" type="number" min="0" step="10" />
      </label>
      <button type="submit">${n.t(`common.add`)}</button>
    </form>
  `}var ft=[0,15,30,45];function pt(e,t,n){let r=e?.sleepMinutes??0,i=Math.min(23,Math.floor(r/60)),a=r%60,o=t.sleepGoal??0;return`
    <div class="bottom-sheet__header">
      <button type="button" class="bottom-sheet__back" data-module="fab" data-action="closeDialog" aria-label="${n.t(`common.back`)}">←</button>
      <button type="button" class="bottom-sheet__close" data-module="fab" data-action="close" aria-label="${n.t(`common.close`)}">×</button>
    </div>
    <div class="bottom-sheet__intro">
      <span class="bottom-sheet__intro-icon" aria-hidden="true">😴</span>
      <h2>${n.t(`habit.sleepQuestion`)}</h2>
      <p class="bottom-sheet__subtitle">${n.t(`habit.sleepGoalHint`)}</p>
    </div>
    <p class="bottom-sheet__progress">${n.formatNumber(r/60)} / ${n.formatNumber(o)} h</p>
    <form class="module-form" data-module="daily-habits" data-action="setSleep">
      <label>
        <span>${n.t(`habit.hours`)}</span>
        <select name="hours">${ht(0,23,i)}</select>
      </label>
      <label>
        <span>${n.t(`habit.minutes`)}</span>
        <select name="minutes">${gt(ft,a)}</select>
      </label>
      <button type="submit">${n.t(`common.saveChanges`)}</button>
    </form>
  `}function mt(e,t,n){let r=e?.steps??0,i=t.stepGoal??0;return`
    ${N(`👣`,`habit.todaysSteps`,n)}
    <p class="bottom-sheet__progress">${n.formatNumber(r)} / ${n.formatNumber(i)}</p>
    <form class="module-form module-form--single" data-module="daily-habits" data-action="setSteps">
      <label>
        <span>${n.t(`habit.stepsCount`)}</span>
        <input name="steps" type="number" min="0" step="1" value="${r||``}" />
      </label>
      <button type="submit">${n.t(`common.saveChanges`)}</button>
    </form>
  `}function ht(e,t,n){let r=[];for(let i=e;i<=t;i+=1)r.push(`<option value="${i}" ${i===n?`selected`:``}>${i}</option>`);return r.join(``)}function gt(e,t){let n=e.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,e[0]);return e.map(e=>`<option value="${e}" ${e===n?`selected`:``}>${e}</option>`).join(``)}var _t=class{constructor({backupService:e}){this.backupService=e}exportJson(){return this.backupService.exportJson()}importJson(e){return this.backupService.importJson(e)}};function P(e={}){return{exportText:e.exportText??``,importText:e.importText??``,message:e.message??``,messageParams:e.messageParams??{},error:e.error??``,errorParams:e.errorParams??{}}}var vt=class{constructor({repository:e,eventBus:t}){this.repository=e,this.eventBus=t,this.status=P()}async initialize(){this.status=P(this.status)}getState(){return this.status}async handleAction(e,t={}){if(e===`export`){this.status=P({exportText:await this.repository.exportJson(),message:`message.backupExported`});return}if(e===`import`)try{let e=await this.repository.importJson(t.importText);this.status=P({importText:t.importText,message:`message.backupImported`,messageParams:{stores:e.importedStores.join(`, `)||`message.noStores`}}),this.eventBus.publish(`backup:imported`,e),this.eventBus.publish(`core-mvp:data-changed`)}catch(e){let n=yt(e);this.status=P({importText:t.importText,error:n.key,errorParams:n.params})}}};function yt(e){let t=e?.message??``;return t.includes(`JSON`)?{key:`error.backupInvalidJson`,params:{}}:t.includes(`unknown object stores`)?{key:`error.backupUnknownStores`,params:{stores:t.split(`:`).slice(1).join(`:`).replace(`.`,``).trim()}}:t.includes(`Unsupported backup format`)?{key:`error.backupUnsupportedFormat`,params:{}}:t.includes(`Backup does not contain stores`)?{key:`error.backupNoStores`,params:{}}:t.includes(`must contain an array of records`)?{key:`error.backupStoreRecords`,params:{}}:{key:`error.backupInvalidJson`,params:{}}}var bt=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.bodyMeasurements)}async list(){return T(await this.repository.getAll(),`recordedAt`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async delete(e){return this.repository.delete(e)}},xt=class{constructor({repository:e,eventBus:t,entityName:n,createEntity:r,validateEntity:i}){this.repository=e,this.eventBus=t,this.entityName=n,this.createEntity=r,this.validateEntity=i,this.records=[],this.editingId=null,this.errors={},this.message=``}async initialize(){await this.load()}async load(){this.records=await this.repository.list()}getState(){return{records:this.records,editingRecord:this.records.find(e=>e.id===this.editingId)??null,errors:this.errors,message:this.message}}async handleAction(e,t={}){if(e===`save`){await this.#e(t);return}if(e===`edit`){this.editingId=t.id,this.errors={},this.message=``;return}if(e===`delete`){await this.repository.delete(t.id),this.editingId=null,this.errors={},this.message=`message.recordDeleted`,await this.load(),this.publishChange();return}e===`cancel`&&(this.editingId=null,this.errors={},this.message=``)}async#e(e){let t=this.editingId?await this.repository.getById(this.editingId):null,n=this.createEntity({...e,id:this.editingId},t),r=this.validateEntity(n);if(Object.keys(r).length>0){this.errors=r,this.message=``;return}await this.repository.save(n),this.editingId=null,this.errors={},this.message=`message.recordSaved`,await this.load(),this.publishChange()}publishChange(){this.eventBus.publish(`${this.entityName}:changed`),this.eventBus.publish(`core-mvp:data-changed`)}};function F(e=`id`){return globalThis.crypto?.randomUUID?`${e}_${globalThis.crypto.randomUUID()}`:`${e}_${Date.now()}_${Math.random().toString(36).slice(2)}`}function St(e={},t){let n=O();return{id:t?.id??e.id??F(`body`),recordedAt:e.recordedAt||t?.recordedAt||D(),chest:E(e.chest??t?.chest),waist:E(e.waist??t?.waist),hips:E(e.hips??t?.hips),arm:E(e.arm??t?.arm),thigh:E(e.thigh??t?.thigh),unit:e.unit||t?.unit||`in`,notes:String(e.notes??t?.notes??``).trim(),createdAt:t?.createdAt??n,updatedAt:n}}function Ct(e){let t={},n=[e.chest,e.waist,e.hips,e.arm,e.thigh];return e.recordedAt||(t.recordedAt=`validation.dateRequired`),n.some(e=>e!==null&&e>0)||(t.measurements=`validation.measurementRequired`),t}var wt=class extends xt{constructor({repository:e,eventBus:t}){super({repository:e,eventBus:t,entityName:`body-measurements`,createEntity:St,validateEntity:Ct})}},Tt=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.dailyHabits)}async getByDate(e){return this.repository.getByIndex(`date`,e)}async getToday(){return this.getByDate(D())}async save(e){return this.repository.save(e)}};function Et(e={},t){let n=O();return{id:t?.id??e.id??F(`daily-habit`),date:e.date||t?.date||D(),waterMl:Dt(e.waterMl??t?.waterMl),sleepMinutes:Dt(e.sleepMinutes??t?.sleepMinutes),steps:Dt(e.steps??t?.steps),createdAt:t?.createdAt??n,updatedAt:n}}function Dt(e){let t=Number(e);return Number.isFinite(t)&&t>0?Math.round(t):0}var Ot=class{constructor({repository:e,eventBus:t}){this.repository=e,this.eventBus=t,this.today=null}async initialize(){this.today=await this.repository.getToday()??null}getState(){return{today:this.today}}async handleAction(e,t={}){if(e===`addWater`){let e=Number(t.amount)||0;if(e!==0){let t=Math.max(0,(this.today?.waterMl??0)+e);await this.#e({waterMl:t})}return}if(e===`setSleep`){let e=Number(t.hours)||0,n=Number(t.minutes)||0;await this.#e({sleepMinutes:e*60+n});return}e===`setSteps`&&await this.#e({steps:Number(t.steps)||0})}async#e(e){let t=Et({...this.today,...e},this.today);await this.repository.save(t),this.today=t,this.eventBus.publish(`daily-habits:changed`),this.eventBus.publish(`core-mvp:data-changed`)}};function kt({meals:e,weights:t,bodyMeasurements:n,medicationApplications:r,dailyHabits:i}){let a=new Date().toISOString().slice(0,10),o=e.filter(e=>e.mealDate===a);return{mealCount:e.length,todayMealCount:o.length,todayCalories:o.reduce((e,t)=>e+(t.calories??0),0),todayProtein:o.reduce((e,t)=>e+(t.protein??0),0),weightCount:t.length,bodyMeasurementCount:n.length,medicationApplicationCount:r.length,activityCount:e.length+t.length+n.length+r.length,latestMeal:e[0]??null,latestWeight:t[0]??null,latestBodyMeasurement:n[0]??null,latestMedicationApplication:r[0]??null,dailyHabits:i??null}}var At=class{constructor({mealJournalRepository:e,weightTrackingRepository:t,bodyMeasurementsRepository:n,medicationRepository:r,dailyHabitsRepository:i}){this.mealJournalRepository=e,this.weightTrackingRepository=t,this.bodyMeasurementsRepository=n,this.medicationRepository=r,this.dailyHabitsRepository=i}async getSummary(){let[e,t,n,r,i]=await Promise.all([this.mealJournalRepository.list(),this.weightTrackingRepository.list(),this.bodyMeasurementsRepository.list(),this.medicationRepository.list(),this.dailyHabitsRepository.getToday()]);return kt({meals:e,weights:t,bodyMeasurements:n,medicationApplications:r,dailyHabits:i})}},jt=class{constructor({repository:e}){this.repository=e,this.summary=null}async initialize(){await this.refresh()}async refresh(){this.summary=await this.repository.getSummary()}getState(){return{summary:this.summary}}async handleAction(){await this.refresh()}},Mt=[{foodCode:`BANANA_PRATA`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:68,protein:1,carbs:18,fat:.1,fiber:2,names:{en:`Banana (Prata)`,"pt-BR":`Banana Prata`}},{foodCode:`BANANA_NANICA`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:89,protein:1.1,carbs:23,fat:.3,fiber:2.6,names:{en:`Banana (Nanica)`,"pt-BR":`Banana Nanica`}},{foodCode:`BANANA_MACA`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:61,protein:.8,carbs:16,fat:.1,fiber:1.7,names:{en:`Banana (Apple Banana)`,"pt-BR":`Banana Maçã`}},{foodCode:`APPLE`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:68,protein:.3,carbs:18,fat:.2,fiber:3,names:{en:`Apple`,"pt-BR":`Maçã`}},{foodCode:`ORANGE`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:62,protein:1.2,carbs:15,fat:.2,fiber:3,names:{en:`Orange`,"pt-BR":`Laranja`}},{foodCode:`PAPAYA`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:43,protein:.5,carbs:11,fat:.1,fiber:1.7,names:{en:`Papaya`,"pt-BR":`Mamão`}},{foodCode:`MANGO`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:60,protein:.8,carbs:15,fat:.4,fiber:1.6,names:{en:`Mango`,"pt-BR":`Manga`}},{foodCode:`PINEAPPLE`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:50,protein:.5,carbs:13,fat:.1,fiber:1,names:{en:`Pineapple`,"pt-BR":`Abacaxi`}},{foodCode:`WATERMELON`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:30,protein:.6,carbs:8,fat:.2,fiber:.4,names:{en:`Watermelon`,"pt-BR":`Melancia`}},{foodCode:`MELON`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:29,protein:.7,carbs:7,fat:.1,fiber:.5,names:{en:`Melon`,"pt-BR":`Melão`}},{foodCode:`STRAWBERRY`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:30,protein:.9,carbs:7,fat:.3,fiber:1.7,names:{en:`Strawberry`,"pt-BR":`Morango`}},{foodCode:`GRAPE`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:53,protein:.5,carbs:14,fat:.2,fiber:.9,names:{en:`Grape`,"pt-BR":`Uva`}},{foodCode:`PEAR`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:86,protein:.6,carbs:22,fat:.2,fiber:4,names:{en:`Pear`,"pt-BR":`Pera`}},{foodCode:`KIWI`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:42,protein:.8,carbs:10,fat:.4,fiber:2.1,names:{en:`Kiwi`,"pt-BR":`Kiwi`}},{foodCode:`AVOCADO`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:96,protein:1.2,carbs:6,fat:8.4,fiber:6.3,names:{en:`Avocado`,"pt-BR":`Abacate`}},{foodCode:`LEMON`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:17,protein:.4,carbs:5,fat:.2,fiber:1.7,names:{en:`Lemon`,"pt-BR":`Limão`}},{foodCode:`TANGERINE`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:46,protein:.7,carbs:12,fat:.2,fiber:1.7,names:{en:`Tangerine`,"pt-BR":`Tangerina`}},{foodCode:`PEACH`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:51,protein:1,carbs:12,fat:.3,fiber:2,names:{en:`Peach`,"pt-BR":`Pêssego`}},{foodCode:`PLUM`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:30,protein:.5,carbs:8,fat:.2,fiber:.9,names:{en:`Plum`,"pt-BR":`Ameixa`}},{foodCode:`FIG`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:37,protein:.4,carbs:10,fat:.2,fiber:1.5,names:{en:`Fig`,"pt-BR":`Figo`}},{foodCode:`GUAVA`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:54,protein:1.1,carbs:12,fat:.5,fiber:5,names:{en:`Guava`,"pt-BR":`Goiaba`}},{foodCode:`PASSION_FRUIT`,category:`fruits`,servingSize:1,servingUnit:`unit`,calories:33,protein:.8,carbs:8,fat:.2,fiber:.9,names:{en:`Passion Fruit`,"pt-BR":`Maracujá`}},{foodCode:`COCONUT`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:354,protein:3.3,carbs:15,fat:33,fiber:9,names:{en:`Coconut`,"pt-BR":`Coco`}},{foodCode:`DRIED_BANANA`,category:`fruits`,servingSize:30,servingUnit:`g`,calories:92,protein:1,carbs:22,fat:.3,fiber:2.3,names:{en:`Dried Banana`,"pt-BR":`Banana Passa`}},{foodCode:`CHERRY`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:63,protein:1.1,carbs:16,fat:.2,fiber:2.1,names:{en:`Cherry`,"pt-BR":`Cereja`}},{foodCode:`BLACKBERRY`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:43,protein:1.4,carbs:10,fat:.5,fiber:5.3,names:{en:`Blackberry`,"pt-BR":`Amora`}},{foodCode:`BLUEBERRY`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:57,protein:.7,carbs:14,fat:.3,fiber:2.4,names:{en:`Blueberry`,"pt-BR":`Mirtilo`}},{foodCode:`RASPBERRY`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:52,protein:1.2,carbs:12,fat:.7,fiber:6.5,names:{en:`Raspberry`,"pt-BR":`Framboesa`}},{foodCode:`LETTUCE`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:15,protein:1.4,carbs:2.9,fat:.2,fiber:1.3,names:{en:`Lettuce`,"pt-BR":`Alface`}},{foodCode:`TOMATO`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:18,protein:.9,carbs:3.9,fat:.2,fiber:1.2,names:{en:`Tomato`,"pt-BR":`Tomate`}},{foodCode:`BROCCOLI`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:34,protein:2.8,carbs:7,fat:.4,fiber:2.6,names:{en:`Broccoli`,"pt-BR":`Brócolis`}},{foodCode:`CARROT`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:41,protein:.9,carbs:10,fat:.2,fiber:2.8,names:{en:`Carrot`,"pt-BR":`Cenoura`}},{foodCode:`BEETROOT`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:43,protein:1.6,carbs:10,fat:.2,fiber:2.8,names:{en:`Beetroot`,"pt-BR":`Beterraba`}},{foodCode:`ZUCCHINI`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:17,protein:1.2,carbs:3.1,fat:.3,fiber:1,names:{en:`Zucchini`,"pt-BR":`Abobrinha`}},{foodCode:`PUMPKIN`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:26,protein:1,carbs:6.5,fat:.1,fiber:.5,names:{en:`Pumpkin`,"pt-BR":`Abóbora`}},{foodCode:`CUCUMBER`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:15,protein:.7,carbs:3.6,fat:.1,fiber:.5,names:{en:`Cucumber`,"pt-BR":`Pepino`}},{foodCode:`SPINACH`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:23,protein:2.9,carbs:3.6,fat:.4,fiber:2.2,names:{en:`Spinach`,"pt-BR":`Espinafre`}},{foodCode:`CAULIFLOWER`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:25,protein:1.9,carbs:5,fat:.3,fiber:2,names:{en:`Cauliflower`,"pt-BR":`Couve-flor`}},{foodCode:`ONION`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:40,protein:1.1,carbs:9.3,fat:.1,fiber:1.7,names:{en:`Onion`,"pt-BR":`Cebola`}},{foodCode:`GARLIC`,category:`vegetables`,servingSize:10,servingUnit:`g`,calories:15,protein:.6,carbs:3.3,fat:.05,fiber:.2,names:{en:`Garlic`,"pt-BR":`Alho`}},{foodCode:`BELL_PEPPER`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:31,protein:1,carbs:6,fat:.3,fiber:2.1,names:{en:`Bell Pepper`,"pt-BR":`Pimentão`}},{foodCode:`EGGPLANT`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:25,protein:1,carbs:6,fat:.2,fiber:3,names:{en:`Eggplant`,"pt-BR":`Berinjela`}},{foodCode:`OKRA`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:33,protein:1.9,carbs:7,fat:.2,fiber:3.2,names:{en:`Okra`,"pt-BR":`Quiabo`}},{foodCode:`KALE`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:35,protein:2.9,carbs:4.4,fat:1.5,fiber:3.6,names:{en:`Kale`,"pt-BR":`Couve`}},{foodCode:`CABBAGE`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:25,protein:1.3,carbs:5.8,fat:.1,fiber:2.5,names:{en:`Cabbage`,"pt-BR":`Repolho`}},{foodCode:`CHAYOTE`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:19,protein:.8,carbs:4.5,fat:.1,fiber:1.7,names:{en:`Chayote`,"pt-BR":`Chuchu`}},{foodCode:`MUSHROOM`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:22,protein:3.1,carbs:3.3,fat:.3,fiber:1,names:{en:`Mushroom`,"pt-BR":`Cogumelo`}},{foodCode:`GREEN_BEANS`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:31,protein:1.8,carbs:7,fat:.1,fiber:3.4,names:{en:`Green Beans`,"pt-BR":`Vagem`}},{foodCode:`ARUGULA`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:25,protein:2.6,carbs:3.7,fat:.7,fiber:1.6,names:{en:`Arugula`,"pt-BR":`Rúcula`}},{foodCode:`CHARD`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:19,protein:1.8,carbs:3.7,fat:.2,fiber:1.6,names:{en:`Chard`,"pt-BR":`Acelga`}},{foodCode:`CELERY`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:16,protein:.7,carbs:3,fat:.2,fiber:1.6,names:{en:`Celery`,"pt-BR":`Salsão`}},{foodCode:`RADISH`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:16,protein:.7,carbs:3.4,fat:.1,fiber:1.6,names:{en:`Radish`,"pt-BR":`Rabanete`}},{foodCode:`BLACK_BEANS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:77,protein:4.5,carbs:14,fat:.5,fiber:8.4,names:{en:`Black Beans`,"pt-BR":`Feijão Preto`}},{foodCode:`CARIOCA_BEANS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:76,protein:4.8,carbs:13.6,fat:.5,fiber:8.5,names:{en:`Carioca Beans`,"pt-BR":`Feijão Carioca`}},{foodCode:`LENTILS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:93,protein:6.3,carbs:16,fat:.4,fiber:7.3,names:{en:`Lentils`,"pt-BR":`Lentilha`}},{foodCode:`CHICKPEAS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:121,protein:6.6,carbs:20,fat:1.9,fiber:6,names:{en:`Chickpeas`,"pt-BR":`Grão-de-Bico`}},{foodCode:`PEAS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:84,protein:5.4,carbs:15,fat:.2,fiber:5.1,names:{en:`Peas`,"pt-BR":`Ervilha`}},{foodCode:`SOYBEANS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:141,protein:12.4,carbs:9.9,fat:6.4,fiber:6,names:{en:`Soybeans`,"pt-BR":`Soja`}},{foodCode:`WHITE_BEANS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:87,protein:5.2,carbs:15.7,fat:.4,fiber:6.3,names:{en:`White Beans`,"pt-BR":`Feijão Branco`}},{foodCode:`FAVA_BEANS`,category:`legumes`,servingSize:100,servingUnit:`g`,calories:88,protein:7.6,carbs:13,fat:.4,fiber:5.4,names:{en:`Fava Beans`,"pt-BR":`Fava`}},{foodCode:`WHITE_RICE`,category:`grains`,servingSize:100,servingUnit:`g`,calories:128,protein:2.5,carbs:28,fat:.2,fiber:1.6,names:{en:`White Rice`,"pt-BR":`Arroz Branco`}},{foodCode:`BROWN_RICE`,category:`grains`,servingSize:100,servingUnit:`g`,calories:123,protein:2.6,carbs:25.8,fat:1,fiber:2.7,names:{en:`Brown Rice`,"pt-BR":`Arroz Integral`}},{foodCode:`OATS`,category:`grains`,servingSize:30,servingUnit:`g`,calories:117,protein:4.2,carbs:20,fat:2.4,fiber:3,names:{en:`Oats`,"pt-BR":`Aveia`}},{foodCode:`GRANOLA`,category:`grains`,servingSize:30,servingUnit:`g`,calories:130,protein:3,carbs:19,fat:5,fiber:2.5,names:{en:`Granola`,"pt-BR":`Granola`}},{foodCode:`CORN`,category:`grains`,servingSize:100,servingUnit:`g`,calories:98,protein:3.4,carbs:21,fat:1.5,fiber:2.4,names:{en:`Corn`,"pt-BR":`Milho`}},{foodCode:`QUINOA`,category:`grains`,servingSize:100,servingUnit:`g`,calories:120,protein:4.4,carbs:21.3,fat:1.9,fiber:2.8,names:{en:`Quinoa`,"pt-BR":`Quinoa`}},{foodCode:`WHOLE_WHEAT_PASTA`,category:`grains`,servingSize:100,servingUnit:`g`,calories:124,protein:5.3,carbs:26,fat:.9,fiber:3.9,names:{en:`Whole Wheat Pasta`,"pt-BR":`Macarrão Integral`}},{foodCode:`WHITE_PASTA`,category:`grains`,servingSize:100,servingUnit:`g`,calories:131,protein:5,carbs:25,fat:1.1,fiber:1.8,names:{en:`White Pasta`,"pt-BR":`Macarrão Branco`}},{foodCode:`POLENTA`,category:`grains`,servingSize:100,servingUnit:`g`,calories:85,protein:2,carbs:18,fat:.5,fiber:1,names:{en:`Polenta`,"pt-BR":`Polenta`}},{foodCode:`COUSCOUS`,category:`grains`,servingSize:100,servingUnit:`g`,calories:112,protein:3.8,carbs:23,fat:.2,fiber:1.4,names:{en:`Couscous`,"pt-BR":`Cuscuz de Milho`}},{foodCode:`BARLEY`,category:`grains`,servingSize:100,servingUnit:`g`,calories:123,protein:2.3,carbs:28,fat:.4,fiber:3.8,names:{en:`Barley`,"pt-BR":`Cevada`}},{foodCode:`RICE_FLOUR`,category:`grains`,servingSize:30,servingUnit:`g`,calories:109,protein:1.8,carbs:24,fat:.2,fiber:.4,names:{en:`Rice Flour`,"pt-BR":`Farinha de Arroz`}},{foodCode:`RYE`,category:`grains`,servingSize:100,servingUnit:`g`,calories:83,protein:3,carbs:18,fat:.6,fiber:3,names:{en:`Rye`,"pt-BR":`Centeio`}},{foodCode:`BUCKWHEAT`,category:`grains`,servingSize:100,servingUnit:`g`,calories:92,protein:3.4,carbs:20,fat:.6,fiber:2.7,names:{en:`Buckwheat`,"pt-BR":`Trigo Sarraceno`}},{foodCode:`POTATO`,category:`roots`,servingSize:100,servingUnit:`g`,calories:87,protein:1.9,carbs:20,fat:.1,fiber:1.8,names:{en:`Potato`,"pt-BR":`Batata`}},{foodCode:`SWEET_POTATO`,category:`roots`,servingSize:100,servingUnit:`g`,calories:86,protein:1.6,carbs:20,fat:.1,fiber:3,names:{en:`Sweet Potato`,"pt-BR":`Batata Doce`}},{foodCode:`CASSAVA`,category:`roots`,servingSize:100,servingUnit:`g`,calories:125,protein:.6,carbs:30,fat:.3,fiber:1.8,names:{en:`Cassava`,"pt-BR":`Mandioca`}},{foodCode:`YAM`,category:`roots`,servingSize:100,servingUnit:`g`,calories:116,protein:1.5,carbs:27,fat:.2,fiber:4.1,names:{en:`Yam`,"pt-BR":`Inhame`}},{foodCode:`TARO`,category:`roots`,servingSize:100,servingUnit:`g`,calories:112,protein:1.5,carbs:26,fat:.2,fiber:4.1,names:{en:`Taro`,"pt-BR":`Cará`}},{foodCode:`MASHED_POTATO`,category:`roots`,servingSize:100,servingUnit:`g`,calories:105,protein:2,carbs:16,fat:4,fiber:1.5,names:{en:`Mashed Potato`,"pt-BR":`Purê de Batata`}},{foodCode:`PURPLE_SWEET_POTATO`,category:`roots`,servingSize:100,servingUnit:`g`,calories:90,protein:1.8,carbs:21,fat:.2,fiber:3.3,names:{en:`Purple Sweet Potato`,"pt-BR":`Batata Doce Roxa`}},{foodCode:`PERUVIAN_CARROT`,category:`roots`,servingSize:100,servingUnit:`g`,calories:80,protein:1.1,carbs:18,fat:.3,fiber:1.5,names:{en:`Peruvian Carrot`,"pt-BR":`Batata Baroa`}},{foodCode:`PEANUTS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:170,protein:7.3,carbs:6,fat:14,fiber:2.4,names:{en:`Peanuts`,"pt-BR":`Amendoim`}},{foodCode:`CASHEWS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:165,protein:5.2,carbs:9,fat:13,fiber:1,names:{en:`Cashews`,"pt-BR":`Castanha de Caju`}},{foodCode:`BRAZIL_NUTS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:199,protein:4.3,carbs:3.6,fat:20,fiber:2.3,names:{en:`Brazil Nuts`,"pt-BR":`Castanha do Pará`}},{foodCode:`WALNUTS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:196,protein:4.6,carbs:4.1,fat:19.6,fiber:2,names:{en:`Walnuts`,"pt-BR":`Noz`}},{foodCode:`ALMONDS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:174,protein:6.3,carbs:6.1,fat:15,fiber:3.5,names:{en:`Almonds`,"pt-BR":`Amêndoas`}},{foodCode:`PISTACHIOS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:168,protein:6,carbs:8,fat:13.4,fiber:3,names:{en:`Pistachios`,"pt-BR":`Pistache`}},{foodCode:`CHIA_SEEDS`,category:`nuts`,servingSize:15,servingUnit:`tablespoon`,calories:70,protein:2.4,carbs:6,fat:4.4,fiber:5.2,names:{en:`Chia Seeds`,"pt-BR":`Semente de Chia`}},{foodCode:`FLAXSEED`,category:`nuts`,servingSize:15,servingUnit:`tablespoon`,calories:75,protein:2.6,carbs:4,fat:5.9,fiber:4.1,names:{en:`Flaxseed`,"pt-BR":`Linhaça`}},{foodCode:`SUNFLOWER_SEEDS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:175,protein:6.1,carbs:6,fat:15.5,fiber:2.7,names:{en:`Sunflower Seeds`,"pt-BR":`Semente de Girassol`}},{foodCode:`PUMPKIN_SEEDS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:165,protein:9,carbs:4.2,fat:14,fiber:1.8,names:{en:`Pumpkin Seeds`,"pt-BR":`Semente de Abóbora`}},{foodCode:`MACADAMIA`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:215,protein:2.2,carbs:4,fat:22.8,fiber:2.4,names:{en:`Macadamia`,"pt-BR":`Macadâmia`}},{foodCode:`PINE_NUTS`,category:`nuts`,servingSize:30,servingUnit:`g`,calories:190,protein:4,carbs:3.7,fat:19,fiber:1,names:{en:`Pine Nuts`,"pt-BR":`Pinoli`}},{foodCode:`CHICKEN_BREAST`,category:`chicken`,servingSize:100,servingUnit:`g`,calories:165,protein:31,carbs:0,fat:3.6,fiber:0,names:{en:`Chicken Breast`,"pt-BR":`Peito de Frango`}},{foodCode:`CHICKEN_THIGH`,category:`chicken`,servingSize:100,servingUnit:`g`,calories:209,protein:26,carbs:0,fat:10.9,fiber:0,names:{en:`Chicken Thigh`,"pt-BR":`Coxa de Frango`}},{foodCode:`CHICKEN_DRUMSTICK`,category:`chicken`,servingSize:100,servingUnit:`g`,calories:172,protein:28,carbs:0,fat:5.7,fiber:0,names:{en:`Chicken Drumstick`,"pt-BR":`Sobrecoxa de Frango`}},{foodCode:`TURKEY_BREAST`,category:`chicken`,servingSize:100,servingUnit:`g`,calories:135,protein:30,carbs:0,fat:1,fiber:0,names:{en:`Turkey Breast`,"pt-BR":`Peito de Peru`}},{foodCode:`LEAN_BEEF`,category:`meat`,servingSize:100,servingUnit:`g`,calories:172,protein:27,carbs:0,fat:6.5,fiber:0,names:{en:`Lean Beef`,"pt-BR":`Carne Bovina Magra`}},{foodCode:`SIRLOIN`,category:`meat`,servingSize:100,servingUnit:`g`,calories:201,protein:27,carbs:0,fat:9.6,fiber:0,names:{en:`Sirloin`,"pt-BR":`Alcatra`}},{foodCode:`RUMP_STEAK`,category:`meat`,servingSize:100,servingUnit:`g`,calories:179,protein:28,carbs:0,fat:7,fiber:0,names:{en:`Rump Steak`,"pt-BR":`Patinho`}},{foodCode:`GROUND_BEEF_LEAN`,category:`meat`,servingSize:100,servingUnit:`g`,calories:172,protein:26,carbs:0,fat:7,fiber:0,names:{en:`Lean Ground Beef`,"pt-BR":`Carne Moída Magra`}},{foodCode:`GROUND_BEEF_REGULAR`,category:`meat`,servingSize:100,servingUnit:`g`,calories:254,protein:25,carbs:0,fat:17,fiber:0,names:{en:`Ground Beef`,"pt-BR":`Carne Moída`}},{foodCode:`PORK_LOIN`,category:`meat`,servingSize:100,servingUnit:`g`,calories:195,protein:28,carbs:0,fat:8.5,fiber:0,names:{en:`Pork Loin`,"pt-BR":`Lombo Suíno`}},{foodCode:`PORK_TENDERLOIN`,category:`meat`,servingSize:100,servingUnit:`g`,calories:143,protein:26,carbs:0,fat:3.5,fiber:0,names:{en:`Pork Tenderloin`,"pt-BR":`Filé Suíno`}},{foodCode:`BACON`,category:`meat`,servingSize:30,servingUnit:`g`,calories:161,protein:11,carbs:.4,fat:12.5,fiber:0,names:{en:`Bacon`,"pt-BR":`Bacon`}},{foodCode:`BEEF_LIVER`,category:`meat`,servingSize:100,servingUnit:`g`,calories:175,protein:26.5,carbs:3.9,fat:4.9,fiber:0,names:{en:`Beef Liver`,"pt-BR":`Fígado Bovino`}},{foodCode:`FILET_MIGNON`,category:`meat`,servingSize:100,servingUnit:`g`,calories:191,protein:29,carbs:0,fat:7.6,fiber:0,names:{en:`Filet Mignon`,"pt-BR":`Filé Mignon`}},{foodCode:`RIBEYE`,category:`meat`,servingSize:100,servingUnit:`g`,calories:250,protein:25,carbs:0,fat:16,fiber:0,names:{en:`Ribeye`,"pt-BR":`Bife Ancho`}},{foodCode:`LAMB`,category:`meat`,servingSize:100,servingUnit:`g`,calories:258,protein:25,carbs:0,fat:17,fiber:0,names:{en:`Lamb`,"pt-BR":`Cordeiro`}},{foodCode:`VEAL`,category:`meat`,servingSize:100,servingUnit:`g`,calories:172,protein:29,carbs:0,fat:5.4,fiber:0,names:{en:`Veal`,"pt-BR":`Vitela`}},{foodCode:`DUCK`,category:`meat`,servingSize:100,servingUnit:`g`,calories:337,protein:19,carbs:0,fat:28,fiber:0,names:{en:`Duck`,"pt-BR":`Pato`}},{foodCode:`SALMON`,category:`fish`,servingSize:100,servingUnit:`g`,calories:208,protein:20,carbs:0,fat:13,fiber:0,names:{en:`Salmon`,"pt-BR":`Salmão`}},{foodCode:`TUNA`,category:`fish`,servingSize:100,servingUnit:`g`,calories:132,protein:28,carbs:0,fat:1.3,fiber:0,names:{en:`Tuna`,"pt-BR":`Atum`}},{foodCode:`TILAPIA`,category:`fish`,servingSize:100,servingUnit:`g`,calories:128,protein:26,carbs:0,fat:2.7,fiber:0,names:{en:`Tilapia`,"pt-BR":`Tilápia`}},{foodCode:`SARDINE`,category:`fish`,servingSize:100,servingUnit:`g`,calories:208,protein:25,carbs:0,fat:11,fiber:0,names:{en:`Sardine`,"pt-BR":`Sardinha`}},{foodCode:`COD`,category:`fish`,servingSize:100,servingUnit:`g`,calories:105,protein:23,carbs:0,fat:.9,fiber:0,names:{en:`Cod`,"pt-BR":`Bacalhau`}},{foodCode:`SHRIMP`,category:`fish`,servingSize:100,servingUnit:`g`,calories:99,protein:24,carbs:.2,fat:.3,fiber:0,names:{en:`Shrimp`,"pt-BR":`Camarão`}},{foodCode:`HAKE`,category:`fish`,servingSize:100,servingUnit:`g`,calories:90,protein:18,carbs:0,fat:1.3,fiber:0,names:{en:`Hake`,"pt-BR":`Merluza`}},{foodCode:`MACKEREL`,category:`fish`,servingSize:100,servingUnit:`g`,calories:205,protein:19,carbs:0,fat:14,fiber:0,names:{en:`Mackerel`,"pt-BR":`Cavala`}},{foodCode:`CANNED_TUNA_WATER`,category:`fish`,servingSize:100,servingUnit:`g`,calories:116,protein:26,carbs:0,fat:.8,fiber:0,names:{en:`Canned Tuna (in Water)`,"pt-BR":`Atum em Lata (Água)`}},{foodCode:`CANNED_TUNA_OIL`,category:`fish`,servingSize:100,servingUnit:`g`,calories:198,protein:25,carbs:0,fat:10,fiber:0,names:{en:`Canned Tuna (in Oil)`,"pt-BR":`Atum em Lata (Óleo)`}},{foodCode:`TROUT`,category:`fish`,servingSize:100,servingUnit:`g`,calories:148,protein:21,carbs:0,fat:6.6,fiber:0,names:{en:`Trout`,"pt-BR":`Truta`}},{foodCode:`ANCHOVY`,category:`fish`,servingSize:30,servingUnit:`g`,calories:37,protein:5.7,carbs:0,fat:1.4,fiber:0,names:{en:`Anchovy`,"pt-BR":`Anchova`}},{foodCode:`WHOLE_EGG`,category:`eggs`,servingSize:1,servingUnit:`unit`,calories:78,protein:6.3,carbs:.6,fat:5.3,fiber:0,names:{en:`Whole Egg`,"pt-BR":`Ovo Inteiro`}},{foodCode:`EGG_WHITE`,category:`eggs`,servingSize:1,servingUnit:`unit`,calories:17,protein:3.6,carbs:.2,fat:.1,fiber:0,names:{en:`Egg White`,"pt-BR":`Clara de Ovo`}},{foodCode:`EGG_YOLK`,category:`eggs`,servingSize:1,servingUnit:`unit`,calories:55,protein:2.7,carbs:.6,fat:4.5,fiber:0,names:{en:`Egg Yolk`,"pt-BR":`Gema de Ovo`}},{foodCode:`WHOLE_MILK`,category:`dairy`,servingSize:200,servingUnit:`mL`,calories:122,protein:6.4,carbs:9.6,fat:6.6,fiber:0,names:{en:`Whole Milk`,"pt-BR":`Leite Integral`}},{foodCode:`SKIM_MILK`,category:`dairy`,servingSize:200,servingUnit:`mL`,calories:70,protein:6.8,carbs:10,fat:.4,fiber:0,names:{en:`Skim Milk`,"pt-BR":`Leite Desnatado`}},{foodCode:`GREEK_YOGURT`,category:`dairy`,servingSize:100,servingUnit:`g`,calories:97,protein:9,carbs:3.9,fat:5,fiber:0,names:{en:`Greek Yogurt`,"pt-BR":`Iogurte Grego`}},{foodCode:`NATURAL_YOGURT`,category:`dairy`,servingSize:100,servingUnit:`g`,calories:61,protein:3.5,carbs:4.7,fat:3.3,fiber:0,names:{en:`Natural Yogurt`,"pt-BR":`Iogurte Natural`}},{foodCode:`MOZZARELLA`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:90,protein:6.7,carbs:.7,fat:6.9,fiber:0,names:{en:`Mozzarella`,"pt-BR":`Mussarela`}},{foodCode:`MINAS_CHEESE`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:72,protein:5.1,carbs:.9,fat:5.4,fiber:0,names:{en:`Minas Cheese`,"pt-BR":`Queijo Minas`}},{foodCode:`PARMESAN`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:130,protein:11.6,carbs:1,fat:8.6,fiber:0,names:{en:`Parmesan`,"pt-BR":`Queijo Parmesão`}},{foodCode:`CREAM_CHEESE`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:99,protein:2.1,carbs:1.5,fat:9.9,fiber:0,names:{en:`Cream Cheese`,"pt-BR":`Cream Cheese`}},{foodCode:`COTTAGE_CHEESE`,category:`dairy`,servingSize:100,servingUnit:`g`,calories:98,protein:11,carbs:3.4,fat:4.3,fiber:0,names:{en:`Cottage Cheese`,"pt-BR":`Queijo Cottage`}},{foodCode:`BUTTER`,category:`dairy`,servingSize:10,servingUnit:`tablespoon`,calories:72,protein:.1,carbs:0,fat:8.1,fiber:0,names:{en:`Butter`,"pt-BR":`Manteiga`}},{foodCode:`REQUEIJAO`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:69,protein:2.4,carbs:1.1,fat:6,fiber:0,names:{en:`Requeijão`,"pt-BR":`Requeijão`}},{foodCode:`PRATO_CHEESE`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:107,protein:6.7,carbs:.6,fat:8.7,fiber:0,names:{en:`Prato Cheese`,"pt-BR":`Queijo Prato`}},{foodCode:`CONDENSED_MILK`,category:`dairy`,servingSize:15,servingUnit:`tablespoon`,calories:49,protein:1.2,carbs:8.3,fat:1.3,fiber:0,names:{en:`Condensed Milk`,"pt-BR":`Leite Condensado`}},{foodCode:`HEAVY_CREAM`,category:`dairy`,servingSize:30,servingUnit:`mL`,calories:100,protein:.7,carbs:1,fat:10.7,fiber:0,names:{en:`Heavy Cream`,"pt-BR":`Creme de Leite`}},{foodCode:`WHIPPED_CREAM`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:103,protein:.6,carbs:3,fat:10,fiber:0,names:{en:`Whipped Cream`,"pt-BR":`Chantilly`}},{foodCode:`RICOTTA`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:38,protein:3.3,carbs:1,fat:2.5,fiber:0,names:{en:`Ricotta`,"pt-BR":`Ricota`}},{foodCode:`FRENCH_BREAD`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:150,protein:4.5,carbs:28,fat:1.5,fiber:1.4,names:{en:`French Bread`,"pt-BR":`Pão Francês`}},{foodCode:`WHOLE_WHEAT_BREAD`,category:`bread`,servingSize:1,servingUnit:`slice`,calories:62,protein:2.7,carbs:11,fat:1,fiber:1.9,names:{en:`Whole Wheat Bread`,"pt-BR":`Pão Integral`}},{foodCode:`TOAST`,category:`bread`,servingSize:1,servingUnit:`slice`,calories:30,protein:1,carbs:5.5,fat:.4,fiber:.4,names:{en:`Toast`,"pt-BR":`Torrada`}},{foodCode:`TAPIOCA`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:108,protein:.1,carbs:26,fat:.1,fiber:.5,names:{en:`Tapioca`,"pt-BR":`Tapioca`}},{foodCode:`HAMBURGER_BUN`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:145,protein:4.5,carbs:26,fat:2.3,fiber:1.2,names:{en:`Hamburger Bun`,"pt-BR":`Pão de Hambúrguer`}},{foodCode:`HOT_DOG_BUN`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:130,protein:4,carbs:24,fat:2,fiber:1,names:{en:`Hot Dog Bun`,"pt-BR":`Pão de Cachorro-Quente`}},{foodCode:`PITA_BREAD`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:165,protein:5.5,carbs:33,fat:.7,fiber:1.3,names:{en:`Pita Bread`,"pt-BR":`Pão Pita`}},{foodCode:`CIABATTA`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:210,protein:7,carbs:40,fat:2,fiber:1.8,names:{en:`Ciabatta`,"pt-BR":`Ciabatta`}},{foodCode:`BAGEL`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:245,protein:9.5,carbs:48,fat:1.4,fiber:2,names:{en:`Bagel`,"pt-BR":`Bagel`}},{foodCode:`CROISSANT`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:231,protein:4.7,carbs:26,fat:12,fiber:1.5,names:{en:`Croissant`,"pt-BR":`Croissant`}},{foodCode:`WHEY_PROTEIN`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:120,protein:24,carbs:3,fat:1.5,fiber:0,names:{en:`Whey Protein`,"pt-BR":`Whey Protein`}},{foodCode:`CASEIN`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:110,protein:24,carbs:2,fat:1,fiber:0,names:{en:`Casein`,"pt-BR":`Caseína`}},{foodCode:`CREATINE`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:0,protein:0,carbs:0,fat:0,fiber:0,names:{en:`Creatine`,"pt-BR":`Creatina`}},{foodCode:`BCAA`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:40,protein:10,carbs:0,fat:0,fiber:0,names:{en:`BCAA`,"pt-BR":`BCAA`}},{foodCode:`MALTODEXTRIN`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:114,protein:0,carbs:28,fat:0,fiber:0,names:{en:`Maltodextrin`,"pt-BR":`Maltodextrina`}},{foodCode:`ALBUMIN`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:108,protein:25,carbs:1,fat:0,fiber:0,names:{en:`Albumin`,"pt-BR":`Albumina`}},{foodCode:`GLUTAMINE`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:20,protein:5,carbs:0,fat:0,fiber:0,names:{en:`Glutamine`,"pt-BR":`Glutamina`}},{foodCode:`PRE_WORKOUT`,category:`supplements`,servingSize:1,servingUnit:`scoop`,calories:15,protein:0,carbs:3,fat:0,fiber:0,names:{en:`Pre-Workout`,"pt-BR":`Pré-Treino`}},{foodCode:`COFFEE`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:2,protein:.3,carbs:0,fat:0,fiber:0,names:{en:`Coffee`,"pt-BR":`Café`}},{foodCode:`TEA`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:1,protein:0,carbs:.3,fat:0,fiber:0,names:{en:`Tea`,"pt-BR":`Chá`}},{foodCode:`ORANGE_JUICE`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:90,protein:1.4,carbs:21,fat:.4,fiber:.4,names:{en:`Orange Juice`,"pt-BR":`Suco de Laranja`}},{foodCode:`COCONUT_WATER`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:38,protein:1.4,carbs:7.4,fat:.4,fiber:2.2,names:{en:`Coconut Water`,"pt-BR":`Água de Coco`}},{foodCode:`SODA`,category:`beverages`,servingSize:350,servingUnit:`mL`,calories:140,protein:0,carbs:37,fat:0,fiber:0,names:{en:`Soda`,"pt-BR":`Refrigerante`}},{foodCode:`BEER`,category:`beverages`,servingSize:350,servingUnit:`mL`,calories:150,protein:1.6,carbs:12,fat:0,fiber:0,names:{en:`Beer`,"pt-BR":`Cerveja`}},{foodCode:`WINE`,category:`beverages`,servingSize:150,servingUnit:`mL`,calories:125,protein:.1,carbs:4,fat:0,fiber:0,names:{en:`Wine`,"pt-BR":`Vinho`}},{foodCode:`ENERGY_DRINK`,category:`beverages`,servingSize:250,servingUnit:`mL`,calories:115,protein:0,carbs:28,fat:0,fiber:0,names:{en:`Energy Drink`,"pt-BR":`Energético`}},{foodCode:`CHOCOLATE_MILK`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:180,protein:7,carbs:26,fat:5,fiber:1,names:{en:`Chocolate Milk`,"pt-BR":`Achocolatado`}},{foodCode:`SPORTS_DRINK`,category:`beverages`,servingSize:500,servingUnit:`mL`,calories:130,protein:0,carbs:32,fat:0,fiber:0,names:{en:`Sports Drink`,"pt-BR":`Isotônico`}},{foodCode:`HOT_CHOCOLATE`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:190,protein:8,carbs:27,fat:6,fiber:1.5,names:{en:`Hot Chocolate`,"pt-BR":`Chocolate Quente`}},{foodCode:`SPARKLING_WATER`,category:`beverages`,servingSize:200,servingUnit:`cup`,calories:0,protein:0,carbs:0,fat:0,fiber:0,names:{en:`Sparkling Water`,"pt-BR":`Água com Gás`}},{foodCode:`CHOCOLATE_BAR`,category:`desserts`,servingSize:1,servingUnit:`unit`,calories:135,protein:1.8,carbs:15,fat:7.6,fiber:1,names:{en:`Chocolate Bar`,"pt-BR":`Barra de Chocolate`}},{foodCode:`ICE_CREAM`,category:`desserts`,servingSize:100,servingUnit:`g`,calories:207,protein:3.5,carbs:24,fat:11,fiber:.7,names:{en:`Ice Cream`,"pt-BR":`Sorvete`}},{foodCode:`COOKIE`,category:`snacks`,servingSize:30,servingUnit:`g`,calories:145,protein:1.8,carbs:20,fat:6.5,fiber:.7,names:{en:`Cookie`,"pt-BR":`Biscoito`}},{foodCode:`POPCORN`,category:`snacks`,servingSize:30,servingUnit:`g`,calories:116,protein:3,carbs:22,fat:1.4,fiber:4.3,names:{en:`Popcorn`,"pt-BR":`Pipoca`}},{foodCode:`POTATO_CHIPS`,category:`snacks`,servingSize:30,servingUnit:`g`,calories:160,protein:2,carbs:15,fat:10.5,fiber:1.4,names:{en:`Potato Chips`,"pt-BR":`Batata Frita (Chips)`}},{foodCode:`DARK_CHOCOLATE`,category:`desserts`,servingSize:25,servingUnit:`g`,calories:145,protein:1.7,carbs:11,fat:10.5,fiber:2.8,names:{en:`Dark Chocolate`,"pt-BR":`Chocolate Amargo`}},{foodCode:`CAKE`,category:`desserts`,servingSize:80,servingUnit:`slice`,calories:290,protein:4,carbs:40,fat:13,fiber:.8,names:{en:`Cake`,"pt-BR":`Bolo`}},{foodCode:`PUDDING`,category:`desserts`,servingSize:100,servingUnit:`g`,calories:150,protein:3,carbs:22,fat:5,fiber:0,names:{en:`Pudding`,"pt-BR":`Pudim`}},{foodCode:`GELATIN`,category:`desserts`,servingSize:100,servingUnit:`g`,calories:62,protein:1.5,carbs:14,fat:0,fiber:0,names:{en:`Gelatin`,"pt-BR":`Gelatina`}},{foodCode:`HONEY`,category:`desserts`,servingSize:15,servingUnit:`tablespoon`,calories:46,protein:0,carbs:12.4,fat:0,fiber:0,names:{en:`Honey`,"pt-BR":`Mel`}},{foodCode:`JAM`,category:`desserts`,servingSize:15,servingUnit:`tablespoon`,calories:40,protein:.1,carbs:10,fat:0,fiber:.2,names:{en:`Jam`,"pt-BR":`Geleia`}},{foodCode:`SUGAR`,category:`desserts`,servingSize:10,servingUnit:`tablespoon`,calories:39,protein:0,carbs:10,fat:0,fiber:0,names:{en:`Sugar`,"pt-BR":`Açúcar`}},{foodCode:`BRIGADEIRO`,category:`desserts`,servingSize:1,servingUnit:`unit`,calories:78,protein:1,carbs:12,fat:3,fiber:.3,names:{en:`Brigadeiro`,"pt-BR":`Brigadeiro`}},{foodCode:`ALFAJOR`,category:`desserts`,servingSize:1,servingUnit:`unit`,calories:180,protein:2,carbs:24,fat:8.5,fiber:.6,names:{en:`Alfajor`,"pt-BR":`Alfajor`}},{foodCode:`WAFER`,category:`snacks`,servingSize:25,servingUnit:`g`,calories:130,protein:1.3,carbs:16,fat:7,fiber:.5,names:{en:`Wafer`,"pt-BR":`Wafer`}},{foodCode:`CEREAL_BAR`,category:`snacks`,servingSize:1,servingUnit:`unit`,calories:96,protein:1.5,carbs:18,fat:2.2,fiber:1.2,names:{en:`Cereal Bar`,"pt-BR":`Barra de Cereal`}},{foodCode:`OLIVE_OIL`,category:`others`,servingSize:13,servingUnit:`tablespoon`,calories:119,protein:0,carbs:0,fat:13.5,fiber:0,names:{en:`Olive Oil`,"pt-BR":`Azeite de Oliva`}},{foodCode:`SOYBEAN_OIL`,category:`others`,servingSize:14,servingUnit:`tablespoon`,calories:124,protein:0,carbs:0,fat:14,fiber:0,names:{en:`Soybean Oil`,"pt-BR":`Óleo de Soja`}},{foodCode:`SALT`,category:`others`,servingSize:1,servingUnit:`g`,calories:0,protein:0,carbs:0,fat:0,fiber:0,names:{en:`Salt`,"pt-BR":`Sal`}},{foodCode:`VINEGAR`,category:`others`,servingSize:15,servingUnit:`tablespoon`,calories:3,protein:0,carbs:.1,fat:0,fiber:0,names:{en:`Vinegar`,"pt-BR":`Vinagre`}},{foodCode:`MAYONNAISE`,category:`others`,servingSize:14,servingUnit:`tablespoon`,calories:94,protein:.1,carbs:.1,fat:10.3,fiber:0,names:{en:`Mayonnaise`,"pt-BR":`Maionese`}},{foodCode:`KETCHUP`,category:`others`,servingSize:17,servingUnit:`tablespoon`,calories:19,protein:.2,carbs:4.5,fat:0,fiber:.1,names:{en:`Ketchup`,"pt-BR":`Ketchup`}},{foodCode:`BLACK_PEPPER`,category:`others`,servingSize:1,servingUnit:`g`,calories:3,protein:.1,carbs:.6,fat:0,fiber:.3,names:{en:`Black Pepper`,"pt-BR":`Pimenta do Reino`}},{foodCode:`OREGANO`,category:`others`,servingSize:1,servingUnit:`g`,calories:3,protein:.1,carbs:.7,fat:.1,fiber:.4,names:{en:`Oregano`,"pt-BR":`Orégano`}},{foodCode:`CINNAMON`,category:`others`,servingSize:2,servingUnit:`g`,calories:5,protein:.1,carbs:1.7,fat:0,fiber:1.1,names:{en:`Cinnamon`,"pt-BR":`Canela`}},{foodCode:`BROWN_SUGAR`,category:`others`,servingSize:10,servingUnit:`tablespoon`,calories:38,protein:0,carbs:9.8,fat:0,fiber:0,names:{en:`Brown Sugar`,"pt-BR":`Açúcar Mascavo`}},{foodCode:`FAROFA`,category:`others`,servingSize:30,servingUnit:`g`,calories:110,protein:.8,carbs:22,fat:2,fiber:1.5,names:{en:`Toasted Cassava Flour (Farofa)`,"pt-BR":`Farofa`}},{foodCode:`PAO_DE_QUEIJO`,category:`bread`,servingSize:1,servingUnit:`unit`,calories:90,protein:2,carbs:9,fat:5,fiber:.2,names:{en:`Cheese Bread (Pão de Queijo)`,"pt-BR":`Pão de Queijo`}},{foodCode:`FRALDINHA`,category:`meat`,servingSize:100,servingUnit:`g`,calories:195,protein:27,carbs:0,fat:9,fiber:0,names:{en:`Flank Steak (Fraldinha)`,"pt-BR":`Fraldinha`}},{foodCode:`CUPIM`,category:`meat`,servingSize:100,servingUnit:`g`,calories:250,protein:24,carbs:0,fat:17,fiber:0,names:{en:`Beef Hump (Cupim)`,"pt-BR":`Cupim`}},{foodCode:`ACEM`,category:`meat`,servingSize:100,servingUnit:`g`,calories:215,protein:26,carbs:0,fat:12,fiber:0,names:{en:`Chuck (Acém)`,"pt-BR":`Acém`}},{foodCode:`COXAO_MOLE`,category:`meat`,servingSize:100,servingUnit:`g`,calories:175,protein:28,carbs:0,fat:6.5,fiber:0,names:{en:`Top Round (Coxão Mole)`,"pt-BR":`Coxão Mole`}},{foodCode:`COXAO_DURO`,category:`meat`,servingSize:100,servingUnit:`g`,calories:170,protein:28,carbs:0,fat:6,fiber:0,names:{en:`Bottom Round (Coxão Duro)`,"pt-BR":`Coxão Duro`}},{foodCode:`CONTRA_FILE`,category:`meat`,servingSize:100,servingUnit:`g`,calories:220,protein:27,carbs:0,fat:12,fiber:0,names:{en:`Striploin (Contra-Filé)`,"pt-BR":`Contra-Filé`}},{foodCode:`LINGUICA`,category:`meat`,servingSize:50,servingUnit:`g`,calories:150,protein:8,carbs:1,fat:13,fiber:0,names:{en:`Brazilian Sausage (Linguiça)`,"pt-BR":`Linguiça`}},{foodCode:`CALABRESA`,category:`meat`,servingSize:50,servingUnit:`g`,calories:155,protein:7.5,carbs:1,fat:13.5,fiber:0,names:{en:`Calabrese Sausage`,"pt-BR":`Calabresa`}},{foodCode:`MORTADELA`,category:`meat`,servingSize:30,servingUnit:`g`,calories:88,protein:3.8,carbs:1,fat:7.5,fiber:0,names:{en:`Mortadella`,"pt-BR":`Mortadela`}},{foodCode:`PICANHA`,category:`meat`,servingSize:100,servingUnit:`g`,calories:230,protein:26,carbs:0,fat:14,fiber:0,names:{en:`Top Sirloin Cap (Picanha)`,"pt-BR":`Picanha`}},{foodCode:`MAMINHA`,category:`meat`,servingSize:100,servingUnit:`g`,calories:180,protein:27,carbs:0,fat:7.5,fiber:0,names:{en:`Tri-Tip (Maminha)`,"pt-BR":`Maminha`}},{foodCode:`REQUEIJAO_LIGHT`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:45,protein:2.8,carbs:1.5,fat:3,fiber:0,names:{en:`Light Requeijão`,"pt-BR":`Requeijão Light`}},{foodCode:`CREAM_CHEESE_LIGHT`,category:`dairy`,servingSize:30,servingUnit:`g`,calories:60,protein:2.8,carbs:2,fat:4.5,fiber:0,names:{en:`Light Cream Cheese`,"pt-BR":`Cream Cheese Light`}},{foodCode:`AGRIAO`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:11,protein:2.3,carbs:1.3,fat:.1,fiber:.5,names:{en:`Watercress`,"pt-BR":`Agrião`}},{foodCode:`COUVE_MANTEIGA`,category:`vegetables`,servingSize:100,servingUnit:`g`,calories:27,protein:2,carbs:4.3,fat:.5,fiber:2,names:{en:`Collard Greens`,"pt-BR":`Couve-Manteiga`}},{foodCode:`FEIJOADA`,category:`others`,servingSize:200,servingUnit:`g`,calories:280,protein:18,carbs:22,fat:14,fiber:6,names:{en:`Feijoada`,"pt-BR":`Feijoada`}},{foodCode:`PAO_DE_FORMA`,category:`bread`,servingSize:25,servingUnit:`slice`,calories:65,protein:2,carbs:12,fat:.8,fiber:.6,names:{en:`Sandwich Bread`,"pt-BR":`Pão de Forma`}},{foodCode:`FARINHA_DE_MANDIOCA`,category:`grains`,servingSize:30,servingUnit:`g`,calories:105,protein:.3,carbs:26,fat:.1,fiber:1.3,names:{en:`Cassava Flour`,"pt-BR":`Farinha de Mandioca`}},{foodCode:`ACAI`,category:`fruits`,servingSize:100,servingUnit:`g`,calories:58,protein:.8,carbs:6,fat:3.9,fiber:2.6,names:{en:`Açaí`,"pt-BR":`Açaí`}},{foodCode:`GUARANA`,category:`beverages`,servingSize:350,servingUnit:`mL`,calories:140,protein:0,carbs:37,fat:0,fiber:0,names:{en:`Guaraná Soda`,"pt-BR":`Guaraná`}},{foodCode:`COXINHA`,category:`snacks`,servingSize:70,servingUnit:`unit`,calories:190,protein:7,carbs:18,fat:10,fiber:.8,names:{en:`Coxinha`,"pt-BR":`Coxinha`}},{foodCode:`PASTEL`,category:`snacks`,servingSize:60,servingUnit:`unit`,calories:220,protein:5,carbs:20,fat:13,fiber:.9,names:{en:`Pastel`,"pt-BR":`Pastel`}},{foodCode:`BEIJINHO`,category:`desserts`,servingSize:20,servingUnit:`unit`,calories:75,protein:.8,carbs:11,fat:3,fiber:.3,names:{en:`Beijinho`,"pt-BR":`Beijinho`}},{foodCode:`VINAGRETE`,category:`others`,servingSize:50,servingUnit:`g`,calories:20,protein:.4,carbs:4,fat:.3,fiber:1,names:{en:`Brazilian Vinaigrette (Vinagrete)`,"pt-BR":`Vinagrete`}},{foodCode:`PAO_DE_ALHO`,category:`bread`,servingSize:40,servingUnit:`unit`,calories:140,protein:3,carbs:16,fat:7,fiber:.8,names:{en:`Garlic Bread`,"pt-BR":`Pão de Alho`}}];function I(e,t){let n=Mt.find(t=>t.foodCode===e);return n?n.names[t]??n.names.en:null}var Nt=[`fruits`,`vegetables`,`legumes`,`grains`,`roots`,`nuts`,`meat`,`chicken`,`fish`,`eggs`,`dairy`,`bread`,`beverages`,`supplements`,`desserts`,`snacks`,`others`],Pt=[`g`,`mL`,`unit`,`slice`,`scoop`,`cup`,`tablespoon`,`serving`];function Ft(e={},t){let n=O();return{id:t?.id??e.id??F(`food`),foodCode:e.foodCode??t?.foodCode??null,isBuiltIn:t?.isBuiltIn??!!e.isBuiltIn,name:String(e.name??t?.name??``).trim(),category:Lt(e.category??t?.category,Nt,`others`),servingSize:Rt(e.servingSize??t?.servingSize,100),servingUnit:Lt(e.servingUnit??t?.servingUnit,Pt,`g`),calories:L(e.calories??t?.calories),protein:L(e.protein??t?.protein),carbs:L(e.carbs??t?.carbs),fat:L(e.fat??t?.fat),fiber:L(e.fiber??t?.fiber),favorite:t?.favorite??!1,createdAt:t?.createdAt??n,updatedAt:n}}function It(e){let t={};return e.name||(t.name=`validation.foodNameRequired`),(!e.servingSize||e.servingSize<=0)&&(t.servingSize=`validation.servingSizePositive`),t}function Lt(e,t,n){return t.includes(e)?e:n}function Rt(e,t){let n=Number(e);return Number.isFinite(n)&&n>0?n:t}function L(e){let t=Number(e);return Number.isFinite(t)&&t>=0?t:0}function zt(e,t){return Ft({foodCode:e.foodCode,isBuiltIn:!0,category:e.category,servingSize:e.servingSize,servingUnit:e.servingUnit,calories:e.calories,protein:e.protein,carbs:e.carbs,fat:e.fat,fiber:e.fiber,name:t?.name??e.names.en},t)}async function Bt(e){await e.hasSeededStarterCatalog()||((await e.list()).length===0&&await e.saveMany(Mt.map(e=>zt(e))),await e.markStarterCatalogSeeded(2))}async function Vt(e){let t=await e.list(),n=new Map(t.filter(e=>e.foodCode).map(e=>[e.foodCode,e])),r=Mt.map(e=>zt(e,n.get(e.foodCode)));await e.saveMany(r),await e.markStarterCatalogSeeded(2)}var Ht=`developer-mode:enabled`,Ut=7,Wt=class{constructor({repositoryFactory:e,foodLibraryRepository:t,eventBus:n}){this.metadataRepository=e.getRepository(c.metadata),this.foodLibraryRepository=t,this.eventBus=n,this.isEnabled=!1,this.justEnabled=!1,this.tapCount=0,this.confirmingAction=null,this.message=``,this.storedCatalogVersion=null}async initialize(){let e=await this.metadataRepository.getById(Ht);this.isEnabled=!!e?.value,this.storedCatalogVersion=await this.foodLibraryRepository.getStoredCatalogVersion()}getState(){return{isEnabled:this.isEnabled,justEnabled:this.justEnabled,confirmingAction:this.confirmingAction,message:this.message,versions:{app:`3.0`,database:6,catalogCurrent:2,catalogStored:this.storedCatalogVersion}}}async handleAction(e,t={}){if(e===`tapLogo`){await this.#e();return}if(e===`requestConfirm`){this.confirmingAction=t.tool??null,this.message=``;return}if(e===`cancelConfirm`){this.confirmingAction=null;return}if(e===`clearDatabase`){await this.#t();return}if(e===`resetFirstLaunch`){await this.#n();return}e===`reimportCatalog`&&await this.#r()}async#e(){this.justEnabled=!1,!this.isEnabled&&(this.tapCount+=1,this.tapCount>=Ut&&(this.tapCount=0,this.isEnabled=!0,this.justEnabled=!0,await this.metadataRepository.save({key:Ht,value:!0,updatedAt:new Date().toISOString()})))}async#t(){this.confirmingAction=null,await Gt(),window.location.reload()}async#n(){if(this.confirmingAction=null,`serviceWorker`in navigator){let e=await navigator.serviceWorker.getRegistrations();await Promise.all(e.map(e=>e.unregister()))}if(`caches`in window){let e=await caches.keys();await Promise.all(e.map(e=>caches.delete(e)))}await Gt(),window.location.reload()}async#r(){this.confirmingAction=null,await Vt(this.foodLibraryRepository),this.storedCatalogVersion=await this.foodLibraryRepository.getStoredCatalogVersion(),this.message=`developer.catalogReimportedMessage`,this.eventBus.publish(`food-library:changed`),this.eventBus.publish(`core-mvp:data-changed`)}};function Gt(){return new Promise((e,t)=>{let n=indexedDB.deleteDatabase(s);n.onsuccess=()=>e(),n.onerror=()=>t(n.error),n.onblocked=()=>e()})}var Kt=`favorites:sort-option`,qt=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.favoriteMeals),this.metadataRepository=e.getRepository(c.metadata)}async list(){return Oe(await this.repository.getAll(),`name`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async delete(e){return this.repository.delete(e)}async getSortOption(){return(await this.metadataRepository.getById(Kt))?.value??`mostUsed`}async saveSortOption(e){await this.metadataRepository.save({key:Kt,value:e,updatedAt:new Date().toISOString()})}},Jt=[...Pe,`custom`],Yt={snack:`morningSnack`,meal:`custom`};function Xt(e){return e===`custom`?`meal`:e}function Zt(e){return Pe.includes(e)?e:Yt[e]??`custom`}function Qt(e={}){return{foodCode:e.foodCode,quantity:rn(e.quantity),servingUnit:e.servingUnit}}function $t(e={},t){let n=O();return{id:t?.id??e.id??F(`favorite-meal`),name:String(e.name??t?.name??``).trim(),category:nn(e.category??t?.category,Jt,`custom`),items:Array.isArray(e.items)?e.items.map(Qt):t?.items??[],usageCount:an(e.usageCount??t?.usageCount),lastUsedAt:e.lastUsedAt??t?.lastUsedAt??null,createdAt:t?.createdAt??n,updatedAt:n}}function en(e){let t=O();return{...e,usageCount:(e.usageCount??0)+1,lastUsedAt:t,updatedAt:t}}function tn(e){let t={};return e.name||(t.name=`validation.favoriteMealNameRequired`),(!e.items||e.items.length===0)&&(t.items=`validation.favoriteMealItemsRequired`),t}function nn(e,t,n){return t.includes(e)?e:n}function rn(e){let t=Number(e);return Number.isFinite(t)&&t>0?t:0}function an(e){let t=Number(e);return Number.isFinite(t)&&t>=0?Math.trunc(t):0}function R(e={},t){let n=O();return{id:t?.id??e.id??F(`meal`),mealDate:e.mealDate||t?.mealDate||D(),mealType:e.mealType||t?.mealType||`meal`,title:String(e.title??t?.title??``).trim(),notes:String(e.notes??t?.notes??``).trim(),source:e.source||t?.source||`manual`,calories:E(e.calories??t?.calories),protein:E(e.protein??t?.protein),carbs:E(e.carbs??t?.carbs),fat:E(e.fat??t?.fat),fiber:E(e.fiber??t?.fiber),hwpFoodRaw:e.hwpFoodRaw??t?.hwpFoodRaw??null,createdAt:t?.createdAt??n,updatedAt:n}}function on(e){let t={};return e.mealDate||(t.mealDate=`validation.dateRequired`),e.title||(t.title=`validation.mealNameRequired`),t}var sn=Object.freeze({calories:0,protein:0,carbs:0,fat:0,fiber:0});function cn(e){return e.foodCode??e.id}function ln(e,t){return e.find(e=>cn(e)===t.foodCode)??null}function un(e,t){if(!e)return{...sn};let n=e.servingSize>0?t.quantity/e.servingSize:0;return{calories:e.calories*n,protein:e.protein*n,carbs:e.carbs*n,fat:e.fat*n,fiber:e.fiber*n}}function z(e,t){return(e.items??[]).reduce((e,n)=>{let r=un(ln(t,n),n);return{calories:e.calories+r.calories,protein:e.protein+r.protein,carbs:e.carbs+r.carbs,fat:e.fat+r.fat,fiber:e.fiber+r.fiber}},{...sn})}async function dn({favoriteMeal:e,mealSlot:t,foods:n,favoriteMealsRepository:r,mealJournalRepository:i}){let a=z(e,n),o=R({mealType:t,title:e.name,source:`favorite`,calories:a.calories,protein:a.protein,carbs:a.carbs,fat:a.fat,fiber:a.fiber});return await i.save(o),await r.save(en(e)),o}var fn=[`mostUsed`,`recentlyUsed`,`alphabetical`];function pn(e,t){let n=[...e];return t===`recentlyUsed`?n.sort((e,t)=>String(t.lastUsedAt??``).localeCompare(String(e.lastUsedAt??``))):t===`alphabetical`?n.sort((e,t)=>e.name.localeCompare(t.name)):n.sort((e,t)=>(t.usageCount??0)-(e.usageCount??0))}var mn=class{constructor({repository:e,foodLibraryRepository:t,mealJournalRepository:n,eventBus:r}){this.repository=e,this.foodLibraryRepository=t,this.mealJournalRepository=n,this.eventBus=r,this.favoriteMeals=[],this.foods=[],this.sortOption=`mostUsed`,this.activeDialog=null,this.wizardMode=`create`,this.wizardStep=`details`,this.draft=null,this.pickingFoodId=null,this.editingItemIndex=null,this.selectedFavoriteId=null,this.errors={},this.message=``}async initialize(){this.sortOption=await this.repository.getSortOption(),await this.load()}async load(){this.favoriteMeals=await this.repository.list(),this.foods=await this.foodLibraryRepository.list()}getState(){return{favoriteMeals:pn(this.favoriteMeals,this.sortOption),sortOption:this.sortOption,foods:this.foods,activeDialog:this.activeDialog,wizardMode:this.wizardMode,wizardStep:this.wizardStep,draft:this.draft,pickingFood:this.pickingFoodId?this.foods.find(e=>e.id===this.pickingFoodId)??null:null,editingItemIndex:this.editingItemIndex,selectedFavoriteId:this.selectedFavoriteId,errors:this.errors,message:this.message,totals:this.draft?z(this.draft,this.foods):null}}async handleAction(e,t={}){if(e===`openCreate`){this.#t(`create`,null);return}if(e===`openEdit`){this.#t(`edit`,t.id);return}if(e===`closeDialog`||e===`closeWizard`){this.#n();return}if(e===`wizardBack`){this.#r();return}if(e===`saveDetails`){this.#i(t);return}if(e===`openFoodPicker`){this.pickingFoodId=t.id,this.editingItemIndex=t.index===void 0?null:Number(t.index);return}if(e===`cancelFoodPicker`){this.pickingFoodId=null,this.editingItemIndex=null;return}if(e===`addItem`){this.#a(t);return}if(e===`removeItem`){this.#o(t);return}if(e===`goToPreview`){(this.draft?.items?.length??0)>0&&(this.wizardStep=`preview`);return}if(e===`backToItems`){this.wizardStep=`items`;return}if(e===`saveFavorite`){await this.#s();return}if(e===`openDeleteConfirm`){this.selectedFavoriteId=t.id,this.activeDialog=`delete-confirm`;return}if(e===`confirmDelete`){await this.#c(t.id??this.selectedFavoriteId);return}if(e===`register`){await this.#l(t.id);return}if(e===`startFromImportedMeal`){await this.#u(t);return}e===`setSortOption`&&await this.#e(t.sortOption)}async#e(e){fn.includes(e)&&(this.sortOption=e,await this.repository.saveSortOption(e))}#t(e,t){if(e===`edit`){let e=this.favoriteMeals.find(e=>e.id===t);if(!e)return;this.draft={id:e.id,name:e.name,category:e.category,items:e.items.map(e=>({...e}))}}else this.draft={id:null,name:``,category:`custom`,items:[]};this.wizardMode=e,this.wizardStep=`details`,this.pickingFoodId=null,this.editingItemIndex=null,this.activeDialog=`wizard`,this.errors={},this.message=``}#n(){this.activeDialog=null,this.draft=null,this.pickingFoodId=null,this.editingItemIndex=null,this.selectedFavoriteId=null,this.errors={}}#r(){if(this.wizardStep===`items`){this.wizardStep=`details`;return}if(this.wizardStep===`preview`){this.wizardStep=`items`;return}this.#n()}#i(e){let t=String(e.name??``).trim();if(!t){this.errors={name:`validation.favoriteMealNameRequired`};return}this.draft={...this.draft,name:t,category:e.category??this.draft.category},this.errors={},this.wizardStep=`items`}#a(e){let t=this.foods.find(t=>t.id===e.foodId);if(!t||!this.draft)return;let n=Number(e.quantity)||0;if(n<=0)return;let r={foodCode:cn(t),quantity:n,servingUnit:t.servingUnit},i=[...this.draft.items];this.editingItemIndex!==null&&i[this.editingItemIndex]?i[this.editingItemIndex]=r:i.push(r),this.draft={...this.draft,items:i},this.pickingFoodId=null,this.editingItemIndex=null}#o(e){if(!this.draft)return;let t=Number(e.index),n=this.draft.items.filter((e,n)=>n!==t);this.draft={...this.draft,items:n}}async#s(){let e=$t({...this.draft,id:this.draft?.id??null},null),t=tn(e);if(Object.keys(t).length>0){this.errors=t;return}await this.repository.save(e),await this.load(),this.#n(),this.message=`message.recordSaved`,this.#d()}async#c(e){e&&(await this.repository.delete(e),await this.load(),this.#n(),this.message=`message.recordDeleted`,this.#d())}async#l(e){let t=this.favoriteMeals.find(t=>t.id===e);t&&(await dn({favoriteMeal:t,mealSlot:Xt(t.category),foods:this.foods,favoriteMealsRepository:this.repository,mealJournalRepository:this.mealJournalRepository}),await this.load(),this.message=`message.favoriteRegistered`,this.eventBus.publish(`meal-journal:changed`),this.eventBus.publish(`core-mvp:data-changed`))}async#u(e){let t=Ft({name:e.name,category:`others`,servingSize:100,servingUnit:`serving`,calories:Number(e.calories)||0,protein:Number(e.protein)||0,carbs:Number(e.carbs)||0,fat:Number(e.fat)||0,fiber:Number(e.fiber)||0});await this.foodLibraryRepository.save(t),await this.load(),this.eventBus.publish(`food-library:changed`),this.eventBus.publish(`core-mvp:data-changed`),this.draft={id:null,name:e.name??``,category:Zt(e.mealType),items:[{foodCode:cn(t),quantity:t.servingSize,servingUnit:t.servingUnit}]},this.wizardMode=`create`,this.wizardStep=`details`,this.activeDialog=`wizard`,this.pickingFoodId=null,this.editingItemIndex=null,this.errors={},this.message=``}#d(){this.eventBus.publish(`favorites:changed`),this.eventBus.publish(`core-mvp:data-changed`)}},hn=`food-library:starter-catalog-seeded`,gn=`food-library:starter-catalog-version`,_n=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.foods),this.metadataRepository=e.getRepository(c.metadata)}async list(){return Oe(await this.repository.getAll(),`name`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async saveMany(e){return this.repository.saveMany(e)}async delete(e){return this.repository.delete(e)}async hasSeededStarterCatalog(){return!!(await this.metadataRepository.getById(hn))?.value}async getStoredCatalogVersion(){return(await this.metadataRepository.getById(gn))?.value??null}async markStarterCatalogSeeded(e){let t=new Date().toISOString();await this.metadataRepository.save({key:hn,value:!0,updatedAt:t}),await this.metadataRepository.save({key:gn,value:e,updatedAt:t})}},vn=class{constructor({repository:e,mealJournalRepository:t,eventBus:n}){this.repository=e,this.mealJournalRepository=t,this.eventBus=n,this.foods=[],this.activeDialog=null,this.editingFoodId=null,this.selectedFoodId=null,this.errors={},this.message=``}async initialize(){await Bt(this.repository),await this.load()}async reimportStarterCatalog(){await Vt(this.repository),await this.load(),this.#a()}async load(){this.foods=await this.repository.list()}getState(){return{foods:this.foods,activeDialog:this.activeDialog,editingFood:this.editingFoodId?this.foods.find(e=>e.id===this.editingFoodId)??null:null,selectedFood:this.selectedFoodId?this.foods.find(e=>e.id===this.selectedFoodId)??null:null,errors:this.errors,message:this.message}}async handleAction(e,t={}){if(e===`openAdd`){this.#e(null);return}if(e===`openEdit`){this.#e(t.id);return}if(e===`closeDialog`){this.#t();return}if(e===`save`){await this.#n(t);return}if(e===`openDeleteConfirm`){this.selectedFoodId=t.id,this.activeDialog=`delete-confirm`;return}if(e===`confirmDelete`){await this.#r(t.id??this.selectedFoodId);return}if(e===`openQuantity`){this.selectedFoodId=t.id,this.activeDialog=`quantity`;return}e===`addToMeal`&&await this.#i(t)}#e(e){this.editingFoodId=e,this.activeDialog=`form`,this.errors={},this.message=``}#t(){this.activeDialog=null,this.editingFoodId=null,this.selectedFoodId=null,this.errors={}}async#n(e){let t=this.editingFoodId?await this.repository.getById(this.editingFoodId):null,n=Ft({...e,id:this.editingFoodId},t),r=It(n);if(Object.keys(r).length>0){this.errors=r;return}await this.repository.save(n),await this.load(),this.#t(),this.message=`message.recordSaved`,this.#a()}async#r(e){e&&(await this.repository.delete(e),await this.load(),this.#t(),this.message=`message.recordDeleted`,this.#a())}async#i(e){let t=await this.repository.getById(e.foodId);if(!t)return;let n=Number(e.quantity)||0,r=t.servingSize>0?n/t.servingSize:0,i=R({title:t.name,mealType:`meal`,source:`library`,calories:t.calories*r,protein:t.protein*r,carbs:t.carbs*r,fat:t.fat*r,fiber:t.fiber*r});await this.mealJournalRepository.save(i),this.#t(),this.message=`message.foodAddedToMeal`,this.eventBus.publish(`meal-journal:changed`),this.eventBus.publish(`core-mvp:data-changed`)}#a(){this.eventBus.publish(`food-library:changed`),this.eventBus.publish(`core-mvp:data-changed`)}},yn=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.meals)}async list(){return T(await this.repository.getAll(),`mealDate`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async delete(e){return this.repository.delete(e)}},bn=class extends xt{constructor({repository:e,eventBus:t}){super({repository:e,eventBus:t,entityName:`meal-journal`,createEntity:R,validateEntity:on})}async handleAction(e,t={}){if(e===`importHwpFood`){await this.#e(t);return}await super.handleAction(e,t)}async#e(e){let t=R({mealType:e.mealType,title:e.name,calories:e.calories,protein:e.protein,carbs:e.carbs,fat:e.fat,fiber:e.fiber,source:`hwp_food`,hwpFoodRaw:e.raw});await this.repository.save(t),await this.load(),this.message=`message.mealImported`,this.publishChange()}},xn=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.mealPlans)}async list(){return Oe(await this.repository.getAll(),`name`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async delete(e){return this.repository.delete(e)}};function Sn(e={}){return{favoriteMealId:e.favoriteMealId,mealSlot:e.mealSlot}}function Cn(e={},t){let n=O();return{id:t?.id??e.id??F(`meal-plan`),name:String(e.name??t?.name??``).trim(),description:String(e.description??t?.description??``).trim(),meals:Array.isArray(e.meals)?e.meals.map(Sn):t?.meals??[],createdAt:t?.createdAt??n,updatedAt:n}}function wn(e){let t={};return e.name||(t.name=`validation.mealPlanNameRequired`),(!e.meals||e.meals.length===0)&&(t.meals=`validation.mealPlanMealsRequired`),t}var Tn=Object.freeze({calories:0,protein:0,carbs:0,fat:0,fiber:0});function En(e,t){return e.find(e=>e.id===t.favoriteMealId)??null}function Dn(e,t,n){return(e.meals??[]).reduce((e,r)=>{let i=En(t,r),a=i?z(i,n):Tn;return{calories:e.calories+a.calories,protein:e.protein+a.protein,carbs:e.carbs+a.carbs,fat:e.fat+a.fat,fiber:e.fiber+a.fiber}},{...Tn})}var On=class{constructor({repository:e,favoriteMealsRepository:t,foodLibraryRepository:n,mealJournalRepository:r,eventBus:i}){this.repository=e,this.favoriteMealsRepository=t,this.foodLibraryRepository=n,this.mealJournalRepository=r,this.eventBus=i,this.mealPlans=[],this.favoriteMeals=[],this.foods=[],this.activeDialog=null,this.wizardMode=`create`,this.wizardStep=`details`,this.draft=null,this.pickingFavoriteMealId=null,this.editingMealIndex=null,this.selectedPlanId=null,this.errors={},this.message=``}async initialize(){await this.load()}async load(){this.mealPlans=await this.repository.list(),this.favoriteMeals=await this.favoriteMealsRepository.list(),this.foods=await this.foodLibraryRepository.list()}getState(){return{mealPlans:this.mealPlans,favoriteMeals:this.favoriteMeals,foods:this.foods,activeDialog:this.activeDialog,wizardMode:this.wizardMode,wizardStep:this.wizardStep,draft:this.draft,pickingFavoriteMeal:this.pickingFavoriteMealId?this.favoriteMeals.find(e=>e.id===this.pickingFavoriteMealId)??null:null,editingMealIndex:this.editingMealIndex,selectedPlanId:this.selectedPlanId,errors:this.errors,message:this.message,totals:this.draft?Dn(this.draft,this.favoriteMeals,this.foods):null}}async handleAction(e,t={}){if(e===`openCreate`){this.#e(`create`,null);return}if(e===`openEdit`){this.#e(`edit`,t.id);return}if(e===`closeDialog`||e===`closeWizard`){this.#t();return}if(e===`wizardBack`){this.#n();return}if(e===`saveDetails`){this.#r(t);return}if(e===`openFavoritePicker`){this.pickingFavoriteMealId=t.id,this.editingMealIndex=t.index===void 0?null:Number(t.index);return}if(e===`cancelFavoritePicker`){this.pickingFavoriteMealId=null,this.editingMealIndex=null;return}if(e===`addMeal`){this.#i(t);return}if(e===`removeMeal`){this.#a(t);return}if(e===`goToPreview`){(this.draft?.meals?.length??0)>0&&(this.wizardStep=`preview`);return}if(e===`backToMeals`){this.wizardStep=`meals`;return}if(e===`saveMealPlan`){await this.#o();return}if(e===`openDeleteConfirm`){this.selectedPlanId=t.id,this.activeDialog=`delete-confirm`;return}if(e===`confirmDelete`){await this.#s(t.id??this.selectedPlanId);return}e===`register`&&await this.#c(t.id)}#e(e,t){if(e===`edit`){let e=this.mealPlans.find(e=>e.id===t);if(!e)return;this.draft={id:e.id,name:e.name,description:e.description,meals:e.meals.map(e=>({...e}))}}else this.draft={id:null,name:``,description:``,meals:[]};this.wizardMode=e,this.wizardStep=`details`,this.pickingFavoriteMealId=null,this.editingMealIndex=null,this.activeDialog=`wizard`,this.errors={},this.message=``}#t(){this.activeDialog=null,this.draft=null,this.pickingFavoriteMealId=null,this.editingMealIndex=null,this.selectedPlanId=null,this.errors={}}#n(){if(this.wizardStep===`meals`){this.wizardStep=`details`;return}if(this.wizardStep===`preview`){this.wizardStep=`meals`;return}this.#t()}#r(e){let t=String(e.name??``).trim();if(!t){this.errors={name:`validation.mealPlanNameRequired`};return}this.draft={...this.draft,name:t,description:String(e.description??``).trim()},this.errors={},this.wizardStep=`meals`}#i(e){let t=this.favoriteMeals.find(t=>t.id===e.favoriteMealId);if(!t||!this.draft||!e.mealSlot)return;let n={favoriteMealId:t.id,mealSlot:e.mealSlot},r=[...this.draft.meals];this.editingMealIndex!==null&&r[this.editingMealIndex]?r[this.editingMealIndex]=n:r.push(n),this.draft={...this.draft,meals:r},this.pickingFavoriteMealId=null,this.editingMealIndex=null}#a(e){if(!this.draft)return;let t=Number(e.index),n=this.draft.meals.filter((e,n)=>n!==t);this.draft={...this.draft,meals:n}}async#o(){let e=Cn({...this.draft,id:this.draft?.id??null},null),t=wn(e);if(Object.keys(t).length>0){this.errors=t;return}await this.repository.save(e),await this.load(),this.#t(),this.message=`message.recordSaved`,this.#l()}async#s(e){e&&(await this.repository.delete(e),await this.load(),this.#t(),this.message=`message.recordDeleted`,this.#l())}async#c(e){let t=this.mealPlans.find(t=>t.id===e);if(!(!t||t.meals.length===0)){for(let e of t.meals){let t=En(this.favoriteMeals,e);t&&await dn({favoriteMeal:t,mealSlot:e.mealSlot,foods:this.foods,favoriteMealsRepository:this.favoriteMealsRepository,mealJournalRepository:this.mealJournalRepository})}await this.load(),this.message=`message.mealPlanRegistered`,this.eventBus.publish(`meal-journal:changed`),this.eventBus.publish(`core-mvp:data-changed`)}}#l(){this.eventBus.publish(`meal-plans:changed`),this.eventBus.publish(`core-mvp:data-changed`)}},kn=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.medicationApplications)}async list(){return T(await this.repository.getAll(),`administeredAt`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async delete(e){return this.repository.delete(e)}};function An(e={},t){let n=O();return{id:t?.id??e.id??F(`medication`),administeredAt:e.administeredAt||t?.administeredAt||D(),doseMg:E(e.doseMg??t?.doseMg),site:e.site||t?.site||`not-specified`,notes:String(e.notes??t?.notes??``).trim(),createdAt:t?.createdAt??n,updatedAt:n}}function jn(e){let t={};return e.administeredAt||(t.administeredAt=`validation.dateRequired`),(e.doseMg===null||e.doseMg<=0)&&(t.doseMg=`validation.dosePositive`),t}var Mn=class extends xt{constructor({repository:e,eventBus:t}){super({repository:e,eventBus:t,entityName:`medication`,createEntity:An,validateEntity:jn})}},Nn=[`injection`,`tablet`,`capsule`,`drops`,`cream`,`other`],Pn=[`daily`,`weekly`,`every-2-weeks`,`monthly`,`custom`],Fn=[`mg`,`mcg`,`mL`,`IU`,`units`,`other`],In=[`monday`,`tuesday`,`wednesday`,`thursday`,`friday`,`saturday`,`sunday`],B=Object.freeze({enabled:!0,name:``,administrationType:`injection`,frequency:`weekly`,defaultDose:null,doseUnit:`mg`,applicationDay:`monday`,notes:``});function Ln(e={},t,n={}){let r=t?.medication??{};return{enabled:e.medicationEnabled===void 0?r.enabled??B.enabled:e.medicationEnabled===`on`,name:String(e.medicationName??r.name??B.name).trim(),administrationType:V(e.administrationType??r.administrationType??B.administrationType,Nn),frequency:V(e.frequency??r.frequency??B.frequency,Pn),defaultDose:E(e.defaultDose??r.defaultDose??n.tirzepatideDose),doseUnit:V(e.doseUnit??r.doseUnit??n.doseUnit??B.doseUnit,Fn),applicationDay:V(e.applicationDay??r.applicationDay??n.injectionDay??B.applicationDay,In),notes:String(e.medicationNotes??r.notes??B.notes).trim()}}function V(e,t){return t.includes(e)?e:t[0]}var Rn=`app-settings`,zn=Object.freeze({en:{weightUnit:`lb`,measurementUnit:`in`},"pt-BR":{weightUnit:`kg`,measurementUnit:`cm`}}),H=Object.freeze({id:Rn,displayName:``,language:`en`,theme:`system`,sex:``,birthDate:``,height:null,healthGoal:`lose-weight`,activityLevel:`moderate`,currentWeight:null,targetWeight:null,calorieGoal:2e3,proteinGoal:120,carbsGoal:180,fatGoal:65,fiberGoal:25,waterGoal:3e3,sleepGoal:8,stepGoal:8e3,medication:B,dashboardCards:{calories:!0,protein:!0,water:!0,sleep:!0,steps:!0,weight:!0,medication:!0,recentMeals:!0,recentActivity:!0},weightUnit:`lb`,measurementUnit:`in`,startScreen:`/`,mealSlots:Object.fromEntries(k.map(e=>[e,!1]))});function Bn(e={},t){let n=O(),r=Vn(e.language??t?.language??H.language),i=zn[r];return{...H,...t,displayName:String(e.displayName??t?.displayName??H.displayName).trim(),language:r,theme:Hn(e.theme??t?.theme??H.theme),sex:Gn(e.sex??t?.sex,[``,`female`,`male`,`other`]),birthDate:e.birthDate??t?.birthDate??H.birthDate,height:Kn(e.height??t?.height),healthGoal:Gn(e.healthGoal??t?.healthGoal,[`lose-weight`,`maintain-weight`,`gain-muscle`]),activityLevel:Gn(e.activityLevel??t?.activityLevel,[`sedentary`,`light`,`moderate`,`intense`]),currentWeight:Kn(e.currentWeight??t?.currentWeight),targetWeight:Kn(e.targetWeight??t?.targetWeight),calorieGoal:U(e.calorieGoal??t?.calorieGoal,H.calorieGoal),proteinGoal:U(e.proteinGoal??t?.proteinGoal,H.proteinGoal),carbsGoal:U(e.carbsGoal??t?.carbsGoal,H.carbsGoal),fatGoal:U(e.fatGoal??t?.fatGoal,H.fatGoal),fiberGoal:U(e.fiberGoal??t?.fiberGoal,H.fiberGoal),waterGoal:U(e.waterGoal??t?.waterGoal,H.waterGoal),sleepGoal:U(e.sleepGoal??t?.sleepGoal,H.sleepGoal),stepGoal:U(e.stepGoal??t?.stepGoal,H.stepGoal),medication:Ln(e,t,{tirzepatideDose:t?.tirzepatideDose,doseUnit:t?.doseUnit,injectionDay:t?.injectionDay}),dashboardCards:Un(e,t),mealSlots:Wn(e,t),weightUnit:i.weightUnit,measurementUnit:i.measurementUnit,startScreen:e.startScreen||t?.startScreen||H.startScreen,createdAt:t?.createdAt??n,updatedAt:n}}function Vn(e){return e===`pt-BR`?`pt-BR`:`en`}function Hn(e){return[`light`,`dark`,`system`].includes(e)?e:`system`}function Un(e,t){let n=t?.dashboardCards??H.dashboardCards;return Object.fromEntries(Object.keys(H.dashboardCards).map(t=>[t,e[`dashboardCard_${t}`]===void 0?n[t]??!0:e[`dashboardCard_${t}`]===`on`]))}function Wn(e,t){let n=t?.mealSlots??H.mealSlots;return Object.fromEntries(k.map(t=>[t,e[`mealSlot_${t}`]===void 0?n[t]??!1:e[`mealSlot_${t}`]===`on`]))}function Gn(e,t){return t.includes(e)?e:t[0]}function Kn(e){if(e==null||e===``)return null;let t=Number(e);return Number.isFinite(t)?t:null}function U(e,t){let n=Kn(e);return n===null?t:n}var qn=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.settings)}async getSettings(){return await this.repository.getById(`app-settings`)??H}async saveSettings(e){let t=Bn(e,await this.getSettings());return await this.repository.save(t),t}async resetSettings(){let e=Bn(H);return await this.repository.save(e),e}},Jn=class{constructor({repository:e,eventBus:t}){this.repository=e,this.eventBus=t,this.settings=null,this.message=``}async initialize(){this.settings=await this.repository.getSettings()}getState(){return{settings:this.settings,message:this.message}}async handleAction(e,t={}){if(e===`save`){this.settings=await this.repository.saveSettings(t),this.message=`message.settingsSaved`,this.eventBus.publish(`settings:changed`,this.settings);return}e===`reset`&&(this.settings=await this.repository.resetSettings(),this.message=`message.settingsReset`,this.eventBus.publish(`settings:changed`,this.settings))}},Yn=class{constructor({repositoryFactory:e}){this.repository=e.getRepository(u.weights)}async list(){return T(await this.repository.getAll(),`recordedAt`)}async getById(e){return this.repository.getById(e)}async save(e){return this.repository.save(e)}async delete(e){return this.repository.delete(e)}};function Xn(e={},t){let n=O();return{id:t?.id??e.id??F(`weight`),recordedAt:e.recordedAt||t?.recordedAt||D(),weight:E(e.weight??t?.weight),unit:e.unit||t?.unit||`lb`,notes:String(e.notes??t?.notes??``).trim(),createdAt:t?.createdAt??n,updatedAt:n}}function Zn(e){let t={};return e.recordedAt||(t.recordedAt=`validation.dateRequired`),(e.weight===null||e.weight<=0)&&(t.weight=`validation.weightPositive`),t}var Qn=class extends xt{constructor({repository:e,eventBus:t}){super({repository:e,eventBus:t,entityName:`weight-tracking`,createEntity:Xn,validateEntity:Zn})}},$n=Object.freeze({"nutri-ia":`meal-register`,"nutri-ia-help":`nutri-ia`,"nutri-ia-success":`meal-register`}),er=class{constructor(){this.isOpen=!1,this.activeDialog=null,this.lastImportedMeal=null}async initialize(){}getState(){return{isOpen:this.isOpen,activeDialog:this.activeDialog,lastImportedMeal:this.lastImportedMeal}}async handleAction(e,t={}){if(e===`open`){this.isOpen=!0,this.activeDialog=null;return}if(e===`close`){this.isOpen=!1,this.activeDialog=null,this.lastImportedMeal=null;return}if(e===`openDialog`){this.activeDialog=t.dialog;return}if(e===`showImportSuccess`){this.activeDialog=`nutri-ia-success`,this.lastImportedMeal=t;return}e===`closeDialog`&&(this.activeDialog=$n[this.activeDialog]??null,this.lastImportedMeal=null)}};function tr({persistence:e,eventBus:t}){let n=e.repositoryFactory,r=new yn({repositoryFactory:n}),i=new Yn({repositoryFactory:n}),a=new bt({repositoryFactory:n}),o=new kn({repositoryFactory:n}),s=new Tt({repositoryFactory:n}),c=new _n({repositoryFactory:n}),l=new qt({repositoryFactory:n}),u=new xn({repositoryFactory:n}),d=new qn({repositoryFactory:n}),f=new _t({backupService:e.backupService});return{dashboard:new jt({repository:new At({mealJournalRepository:r,weightTrackingRepository:i,bodyMeasurementsRepository:a,medicationRepository:o,dailyHabitsRepository:s})}),"meal-journal":new bn({repository:r,eventBus:t}),"weight-tracking":new Qn({repository:i,eventBus:t}),"body-measurements":new wt({repository:a,eventBus:t}),medication:new Mn({repository:o,eventBus:t}),"daily-habits":new Ot({repository:s,eventBus:t}),"food-library":new vn({repository:c,mealJournalRepository:r,eventBus:t}),favorites:new mn({repository:l,foodLibraryRepository:c,mealJournalRepository:r,eventBus:t}),"meal-plans":new On({repository:u,favoriteMealsRepository:l,foodLibraryRepository:c,mealJournalRepository:r,eventBus:t}),settings:new Jn({repository:d,eventBus:t}),"backup-restore":new vt({repository:f,eventBus:t}),fab:new er,developer:new Wt({repositoryFactory:n,foodLibraryRepository:c,eventBus:t})}}var nr=`/Health-Weight-Pro/`;function rr(e){return e===`/`?nr:`${nr}${e.slice(1)}`}function ir(e){if(!e.startsWith(nr))return`/`;let t=e.slice(19).replace(/\/+$/,``);return t?`/${t}`:`/`}function ar({routes:e,logger:t}){let n=new Map(e.map(e=>[e.path,e])),r=new Set,i=n.get(`/`)??e[0];function a(e){return n.get(e)??n.get(`/`)??i}function o(){r.forEach(e=>e(i))}return{getCurrentRoute(){return i},getRoutes(){return e},toHref(e){return rr(e)},navigate(e){let n=a(e);n.path!==i.path&&(i=n,window.history.pushState({},``,rr(i.path)),document.title=`${i.label} | Health Weight Pro`,t.info(`Navigation changed.`,{path:i.path}),o())},onChange(e){return r.add(e),()=>r.delete(e)},start(){i=a(ir(window.location.pathname)),document.title=`${i.label} | Health Weight Pro`,window.addEventListener(`popstate`,()=>{i=a(ir(window.location.pathname)),document.title=`${i.label} | Health Weight Pro`,o()}),o()}}}function W(e,t=`success`,n,r={}){return e?`<p class="form-message form-message--${t}">${y(or(e,n,r))}</p>`:``}function G(e,t,n){return e[t]?`<span class="field-error">${y(or(e[t],n))}</span>`:``}function K(e){return`<p class="empty-state">${y(e)}</p>`}function q(e){return y(e??``)}function J(e){return e==null?``:y(e)}function or(e,t,n={}){if(!t?.t)return e;let r=Object.fromEntries(Object.entries(n).map(([e,n])=>[e,typeof n==`string`&&n.includes(`.`)?t.t(n):n]));return t.t(e,r)}function sr(e){let t=e.app.i18n;return`
    <section class="module-screen" aria-labelledby="backup-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${t.t(`route.backupRestore`)}</p>
        <h1 id="backup-title">${t.t(`route.backupRestore`)}</h1>
        <p>${t.t(`backup.description`)}</p>
      </div>

      <section class="content-panel">
        <h2>${t.t(`backup.export`)}</h2>
        ${W(e.message,`success`,t,e.messageParams)}
        ${W(e.error,`error`,t,e.errorParams)}
        <div class="form-actions">
          <button type="button" data-module="backup-restore" data-action="export">${t.t(`backup.exportJson`)}</button>
        </div>
        <textarea class="backup-textarea" readonly rows="10">${q(e.exportText)}</textarea>
      </section>

      <section class="content-panel">
        <h2>${t.t(`backup.import`)}</h2>
        <form class="module-form module-form--single" data-module="backup-restore" data-action="import">
          <label class="module-form__wide">
            <span>${t.t(`backup.json`)}</span>
            <textarea name="importText" rows="10" placeholder="${t.t(`backup.placeholder`)}">${q(e.importText)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${t.t(`backup.importJson`)}</button>
          </div>
        </form>
      </section>
    </section>
  `}function cr(e){let t=e.editingRecord??{},n=e.app.i18n,r=e.app.units.measurement;return`
    <section class="module-screen" aria-labelledby="body-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${n.t(`route.bodyMeasurements`)}</p>
        <h1 id="body-title">${n.t(`route.bodyMeasurements`)}</h1>
        <p>${n.t(`body.description`)}</p>
      </div>

      <section class="content-panel">
        <h2>${e.editingRecord?n.t(`body.edit`):n.t(`body.add`)}</h2>
        ${W(e.message,`success`,n)}
        <form class="module-form" data-module="body-measurements" data-action="save">
          <label>
            <span>${n.t(`common.date`)}</span>
            <input name="recordedAt" type="date" value="${q(t.recordedAt??D())}" />
            ${G(e.errors,`recordedAt`,n)}
          </label>
          <label>
            <span>${n.t(`common.unit`)}</span>
            <input value="${r}" readonly aria-readonly="true" />
            <input name="unit" type="hidden" value="${r}" />
          </label>
          <label>
            <span>${n.t(`body.chest`)}</span>
            <input name="chest" type="number" min="0" step="0.1" value="${J(t.chest)}" />
          </label>
          <label>
            <span>${n.t(`body.waist`)}</span>
            <input name="waist" type="number" min="0" step="0.1" value="${J(t.waist)}" />
          </label>
          <label>
            <span>${n.t(`body.hips`)}</span>
            <input name="hips" type="number" min="0" step="0.1" value="${J(t.hips)}" />
          </label>
          <label>
            <span>${n.t(`body.arm`)}</span>
            <input name="arm" type="number" min="0" step="0.1" value="${J(t.arm)}" />
          </label>
          <label>
            <span>${n.t(`body.thigh`)}</span>
            <input name="thigh" type="number" min="0" step="0.1" value="${J(t.thigh)}" />
          </label>
          <label class="module-form__wide">
            <span>${n.t(`common.notes`)}</span>
            <textarea name="notes" rows="3">${q(t.notes)}</textarea>
            ${G(e.errors,`measurements`,n)}
          </label>
          <div class="form-actions">
            <button type="submit">${e.editingRecord?n.t(`common.saveChanges`):n.t(`body.addButton`)}</button>
            ${e.editingRecord?`<button type="button" data-action="cancel">${n.t(`common.cancel`)}</button>`:``}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${n.t(`body.listTitle`)}</h2>
        ${lr(e.records,n)}
      </section>
    </section>
  `}function lr(e,t){return e.length===0?K(t.t(`body.empty`)):`
    <div class="record-list">
      ${e.map(e=>`
            <article class="record-card">
              <div>
                <span class="record-card__meta">${y(t.formatDate(e.recordedAt))} &middot; ${y(e.unit)}</span>
                <h3>${ur(e,t)}</h3>
                <p>${e.notes?y(e.notes):t.t(`common.noNotes`)}</p>
              </div>
              <div class="record-card__actions">
                <button type="button" data-action="edit" data-id="${e.id}">${t.t(`common.edit`)}</button>
                <button type="button" data-action="delete" data-id="${e.id}">${t.t(`common.delete`)}</button>
              </div>
            </article>
          `).join(``)}
    </div>
  `}function ur(e,t){let n={chest:t.t(`body.chest`),waist:t.t(`body.waist`),hips:t.t(`body.hips`),arm:t.t(`body.arm`),thigh:t.t(`body.thigh`)};return[`chest`,`waist`,`hips`,`arm`,`thigh`].filter(t=>e[t]!==null&&e[t]!==void 0).map(r=>`${y(n[r])}: ${y(t.formatNumber(e[r]))}`).join(` &middot; `)}var dr=[{key:`calories`,labelKey:`dashboard.calories`,unit:`kcal`,icon:`flame`},{key:`protein`,labelKey:`dashboard.protein`,unit:`g`,icon:`protein`},{key:`water`,labelKey:`dashboard.water`,unit:`mL`,icon:`water`},{key:`sleep`,labelKey:`dashboard.sleep`,unit:`h`,icon:`moon`},{key:`steps`,labelKey:`dashboard.steps`,icon:`steps`},{key:`weight`,labelKey:`dashboard.weight`,icon:`scale`},{key:`medication`,labelKey:`dashboard.medication`,icon:`syringe`},{key:`recentMeals`,labelKey:`dashboard.recentMealsCard`,icon:`utensils`},{key:`recentActivity`,labelKey:`dashboard.recentActivityCard`,icon:`activity`}];function fr(e){let t=e.summary??{},n=e.app.settings??{},r=e.app.i18n,i=e.justAchievedKeys??[],a=e.allGoalsJustAchieved??!1,o=mr({summary:t,settings:n,i18n:r,units:e.app.units,justAchievedKeys:i}),s=o.filter(e=>e.key===`medication`&&n.medication?.enabled===!1?!1:n.dashboardCards?.[e.key]??!0),c=s.filter(e=>e.achievable),l=c.length>0&&c.every(e=>e.achieved);return`
    <section class="module-screen module-screen--dashboard" aria-labelledby="dashboard-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${r.t(`dashboard.eyebrow`)}</p>
        <h1 id="dashboard-title">${r.t(`route.dashboard`)}</h1>
        <p>${r.t(`dashboard.description`)}</p>
      </div>

      ${hr(o,n,r)}

      <section class="dashboard-section${a?` dashboard-section--celebrate`:``}" aria-labelledby="dashboard-progress-title">
        <div class="dashboard-section__header">
          <div>
            <p class="module-screen__eyebrow">${r.t(`dashboard.currentProgress`)}</p>
            <h2 id="dashboard-progress-title">${r.t(`dashboard.configuredGoals`)}</h2>
          </div>
          ${l?`<span class="dashboard-trophy${a?` dashboard-trophy--celebrate`:``}" role="img" aria-label="${r.t(`dashboard.allGoalsAchieved`)}">🏆</span>`:``}
        </div>
        <div class="metric-grid">
          ${s.map(e=>_r(e,r)).join(``)}
        </div>
      </section>
    </section>
  `}var pr=new Set([`calories`,`protein`,`water`,`steps`,`sleep`]);function mr({summary:e,settings:t,i18n:n,units:r,justAchievedKeys:i=[]}){let a=t.medication??{},o=e.dailyHabits??{},s=e.latestWeight?.weight??t.currentWeight??0,c=e.latestMedicationApplication?.doseMg??0,l={calories:t.calorieGoal??0,protein:t.proteinGoal??0,water:t.waterGoal??0,sleep:t.sleepGoal??0,steps:t.stepGoal??0,weight:t.targetWeight??0,medication:a.defaultDose??0,recentMeals:3,recentActivity:7},u={calories:e.todayCalories??0,protein:e.todayProtein??0,water:o.waterMl??0,sleep:(o.sleepMinutes??0)/60,steps:o.steps??0,weight:s,medication:c,recentMeals:e.todayMealCount??0,recentActivity:e.activityCount??0};return dr.map(e=>{let t=e.key,o=t===`water`,s=t===`weight`?r.weight:t===`medication`?a.doseUnit||`mg`:e.unit??``,c=yr(u[t],l[t],t),d=pr.has(t),f=d&&l[t]>0&&u[t]>=l[t],ee=Math.max(0,l[t]-u[t]),p=o?`L`:t===`steps`?n.t(`dashboard.stepsUnit`):s,m=o?2:1,h=e=>o?e/1e3:e;return{...e,title:t===`medication`?a.name||n.t(e.labelKey):void 0,subtitle:t===`medication`&&a.applicationDay?`${n.t(`dashboard.nextApplication`)}: ${n.t(`day.${a.applicationDay}`)}`:void 0,current:u[t],currentLabel:Y(u[t],s,n),goal:l[t],goalLabel:Y(l[t],s,n),cardCurrentLabel:Y(h(u[t]),p,n,m),cardGoalLabel:Y(h(l[t]),p,n,m),remainingLabel:Y(h(ee),p,n,m),achievable:d,achieved:f,justAchieved:i.includes(t),percent:c,status:br(c),unit:s}})}function hr(e,t,n){let r=t.displayName?n.t(`dashboard.greeting`,{name:t.displayName}):n.t(`dashboard.greetingNoName`),i=e.find(e=>e.key===`calories`),a=e.find(e=>e.key===`protein`),o=e.find(e=>e.key===`water`),s=e.find(e=>e.key===`sleep`),c=[i,a,o,s].filter(e=>e.goal>e.current).map(e=>`${Y(e.goal-e.current,e.unit,n)} ${n.t(e.labelKey)}`);return`
    <section class="daily-summary">
      <div class="daily-summary__copy">
        <p class="module-screen__eyebrow">${n.t(`dashboard.smartSummary`)}</p>
        <h2>${r}</h2>
        <p>${n.t(`dashboard.todayConsumed`)} <strong>${i.currentLabel}</strong> (${i.percent}%).</p>
      </div>
      <div class="daily-summary__stats">
        ${[a,o,s].map(e=>gr(e,n)).join(``)}
      </div>
      <div class="daily-summary__remaining">
        <span>${n.t(`common.remainingToday`)}</span>
        <p>${c.length>0?`${n.t(`dashboard.missingPrefix`)}: ${c.join(`, `)}`:n.t(`dashboard.allSet`)}</p>
      </div>
    </section>
  `}function gr(e,t){return`
    <article>
      <span>${t.t(e.labelKey)}</span>
      <strong>${e.currentLabel}</strong>
      <small>${e.percent}%</small>
    </article>
  `}function _r(e,t){return`
    <article class="metric-card ${[`metric-card--${e.status}`,e.justAchieved?`metric-card--celebrate`:``].filter(Boolean).join(` `)}">
      <div class="metric-card__header">
        <span class="metric-card__icon" aria-hidden="true">${xr(e.icon)}</span>
        <span class="metric-card__status">${t.t(`common.${e.status}`)}</span>
      </div>
      <h3>${y(e.title??t.t(e.labelKey))}</h3>
      ${e.subtitle?`<p class="metric-card__subtitle">${y(e.subtitle)}</p>`:``}
      <div class="metric-card__values">
        <strong>${e.cardCurrentLabel??e.currentLabel}</strong>
        <span>${t.t(`common.goal`)}: ${e.cardGoalLabel??e.goalLabel}</span>
      </div>
      <div class="progress-bar" aria-label="${t.t(e.labelKey)} ${e.percent}%">
        <span style="width: ${e.percent}%"></span>
      </div>
      ${vr(e,t)}
    </article>
  `}function vr(e,t){return e.achievable?e.achieved?`<p class="metric-card__goal-status metric-card__goal-status--achieved"><span class="metric-card__check" aria-hidden="true">✅</span> ${t.t(`dashboard.goalAchieved`)}</p>`:e.key===`sleep`?`<p class="metric-card__goal-status"><span aria-hidden="true">⚠️</span> ${t.t(`dashboard.goalNotAchieved`)}</p>`:`<p class="metric-card__remaining">${t.t(`dashboard.remaining`)} ${e.remainingLabel}</p>`:`<p>${e.percent}%</p>`}function yr(e,t,n){return!t||t<=0?0:Math.min(100,Math.round(Number(e||0)/t*100))}function br(e){return e>=100?`reached`:e>=70?`normal`:e>=40?`attention`:`critical`}function Y(e,t,n,r=1){return`${n.formatNumber(e??0,{maximumFractionDigits:r})}${t?` ${y(t)}`:``}`}function xr(e){let t={flame:`<path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-8-.5 2-2 3-3 4 0-3-2-6-4-8 0 4-3 6-3 11 0 4 3 8 7 8Z"></path>`,protein:`<path d="M6 15c-2 0-4-2-4-4s2-4 4-4h12c2 0 4 2 4 4s-2 4-4 4H6Z"></path><path d="M8 15v4"></path><path d="M16 15v4"></path>`,water:`<path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7Z"></path>`,moon:`<path d="M21 14a8 8 0 1 1-11-11 7 7 0 0 0 11 11Z"></path>`,steps:`<path d="M7 4a2 2 0 0 1 2 2c0 1.5-.5 2-1 3s-1 2-1 3.5A2 2 0 0 0 9 14"></path><path d="M17 10a2 2 0 0 1 2 2c0 1.5-.5 2-1 3s-1 2-1 3.5a2 2 0 0 1-2 2.5"></path><circle cx="8.5" cy="20" r="1"></circle><circle cx="16.5" cy="6" r="1"></circle>`,scale:`<path d="M12 3v3"></path><path d="M6 7h12l3 12H3L6 7Z"></path><path d="m9 12 3 3 3-3"></path>`,syringe:`<path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8 20l-4-4L15 5l4 4Z"></path><path d="m9 7 8 8"></path><path d="m4 20-2 2"></path>`,utensils:`<path d="M4 3v7a4 4 0 0 0 4 4v7"></path><path d="M8 3v18"></path><path d="M12 3v7a4 4 0 0 1-4 4"></path><path d="M17 3v18"></path><path d="M17 3c2.5 2 3.5 4.5 3 8h-3"></path>`,activity:`<path d="M3 12h4l3 8 4-16 3 8h4"></path>`};return`
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      ${t[e]??t.activity}
    </svg>
  `}var Sr=[`details`,`items`,`preview`],Cr=[{value:`mostUsed`,icon:`⭐`,labelKey:`favorites.sort.mostUsed`},{value:`recentlyUsed`,icon:`🕒`,labelKey:`favorites.sort.recentlyUsed`},{value:`alphabetical`,icon:`🔤`,labelKey:`favorites.sort.alphabetical`}];function X(e,t){return e===`custom`?t.t(`favorites.category.custom`):t.t(`mealSlot.${e}`)}function wr(e){return[...Fe(e),`custom`]}function Tr(e){let t=e.app.i18n,n=e.app.settings??{},r=e.favoriteMeals??[],i=e.foods??[],a=r.length===0;return`
    <section class="module-screen" aria-labelledby="favorites-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${t.t(`route.favorites`)}</p>
        <h1 id="favorites-title">${t.t(`route.favorites`)}</h1>
        <p>${t.t(`favorites.description`)}</p>
      </div>

      ${a?Dr(t):Or(r,i,e.sortOption,n,e.message,t)}

      ${e.activeDialog===`wizard`&&e.draft?jr(e,n,t):``}
      ${e.activeDialog===`delete-confirm`?Rr(r.find(t=>t.id===e.selectedFavoriteId),t):``}
    </section>
  `}function Er(e,t){let n=t.app.i18n,r=t.foods??[];if(Hr(e,t.favoriteMeals??[],r,n),t.activeDialog===`wizard`&&t.wizardStep===`items`)if(t.pickingFood){let r=t.editingItemIndex===null?null:t.draft.items[t.editingItemIndex],i=r?r.quantity:t.pickingFood.servingSize;Wr(e,t.pickingFood,i,n)}else Ur(e,r,n)}function Dr(e){return`
    <section class="content-panel favorites-empty">
      <span class="favorites-empty__icon" aria-hidden="true">⭐</span>
      <h2>${e.t(`favorites.emptyTitle`)}</h2>
      <p>${e.t(`favorites.emptyHint`)}</p>
      <button type="button" data-module="favorites" data-action="openCreate">${e.t(`favorites.createButton`)}</button>
    </section>
  `}function Or(e,t,n,r,i,a){return`
    <section class="content-panel">
      ${W(i,`success`,a)}
      <div class="favorites__sort" role="group" aria-label="${a.t(`favorites.sortLabel`)}">
        ${Cr.map(e=>`
            <button
              type="button"
              class="favorites__sort-option${n===e.value?` is-active`:``}"
              data-module="favorites"
              data-action="setSortOption"
              data-sort-option="${e.value}"
            >${e.icon} ${a.t(e.labelKey)}</button>
          `).join(``)}
      </div>
      <div class="favorites__toolbar">
        <input
          type="search"
          class="favorites__search"
          data-favorite-search
          placeholder="${a.t(`favorites.searchPlaceholder`)}"
          aria-label="${a.t(`favorites.searchPlaceholder`)}"
        />
        <select class="favorites__category-filter" data-favorite-category-filter aria-label="${a.t(`favorites.category`)}">
          <option value="all">${a.t(`favorites.allCategories`)}</option>
          ${wr(r).map(e=>`<option value="${e}">${X(e,a)}</option>`).join(``)}
        </select>
        <button type="button" data-module="favorites" data-action="openCreate">${a.t(`favorites.createButton`)}</button>
      </div>
      <div class="favorite-card-grid" data-favorite-list>
        ${kr(e,t,a)}
      </div>
    </section>
  `}function kr(e,t,n){return e.length===0?K(n.t(`favorites.noResults`)):e.map(e=>Ar(e,t,n)).join(``)}function Ar(e,t,n){let r=z(e,t);return`
    <article class="favorite-card" data-module="favorites" data-action="register" data-id="${e.id}" role="button" tabindex="0">
      <div class="favorite-card__header">
        <h3>${y(e.name)}</h3>
        <span class="favorite-card__category">${y(X(e.category,n))}</span>
      </div>
      <p class="favorite-card__meta">${n.t(`favorites.foodsCount`,{count:e.items.length})}</p>
      <div class="favorite-card__macros">
        <span>${n.formatNumber(r.calories)} kcal</span>
        <span>${n.formatNumber(r.protein)} g ${n.t(`settings.protein`).toLowerCase()}</span>
      </div>
      <div class="favorite-card__actions">
        <button type="button" data-module="favorites" data-action="openEdit" data-id="${e.id}">${n.t(`common.edit`)}</button>
        <button type="button" data-module="favorites" data-action="openDeleteConfirm" data-id="${e.id}">${n.t(`common.delete`)}</button>
      </div>
    </article>
  `}function jr(e,t,n){let{draft:r,wizardMode:i,wizardStep:a}=e,o=n.t(i===`edit`?`favorites.editFavorite`:`favorites.createFavorite`),s=Sr.indexOf(a);return`
    <button type="button" class="bottom-sheet-overlay" data-module="favorites" data-action="closeWizard" aria-label="${n.t(`common.close`)}"></button>
    <div class="bottom-sheet favorites-wizard" role="dialog" aria-modal="true" aria-label="${o}">
      <div class="bottom-sheet__header">
        ${a===`details`?``:`<button type="button" class="bottom-sheet__back" data-module="favorites" data-action="wizardBack" aria-label="${n.t(`common.back`)}">←</button>`}
        <h2>${o}</h2>
        <button type="button" class="bottom-sheet__close" data-module="favorites" data-action="closeWizard" aria-label="${n.t(`common.close`)}">×</button>
      </div>
      <div class="favorites-wizard__steps" aria-hidden="true">
        ${Sr.map((e,t)=>`<span class="favorites-wizard__step${t<=s?` is-active`:``}"></span>`).join(``)}
      </div>
      ${a===`details`?Mr(r,e.errors,t,n):a===`items`?Nr(e,n):Pr(e,n)}
    </div>
  `}function Mr(e,t,n,r){return`
    <form class="module-form" data-module="favorites" data-action="saveDetails">
      <label class="module-form__wide">
        <span>${r.t(`favorites.mealName`)}</span>
        <input name="name" value="${q(e.name)}" placeholder="${r.t(`favorites.namePlaceholder`)}" />
        ${G(t,`name`,r)}
      </label>
      <label>
        <span>${r.t(`favorites.category`)}</span>
        <select name="category">${zr(e.category,n,r)}</select>
      </label>
      <div class="form-actions">
        <button type="submit">${r.t(`favorites.nextButton`)}</button>
        <button type="button" data-module="favorites" data-action="closeWizard">${r.t(`common.cancel`)}</button>
      </div>
    </form>
  `}function Nr(e,t){let{draft:n,foods:r,pickingFood:i,editingItemIndex:a}=e;if(i){let e=a===null?null:n.items[a],r=e?e.quantity:i.servingSize;return`
      <div class="favorites-wizard__section">
        <h3>${y(Vr(i,t))}</h3>
        <form class="module-form module-form--single" data-module="favorites" data-action="addItem">
          <input type="hidden" name="foodId" value="${i.id}" />
          ${a===null?``:`<input type="hidden" name="index" value="${a}" />`}
          <label>
            <span>${t.t(`foodLibrary.quantity`)} (${y(Br(i.servingUnit,t))})</span>
            <input name="quantity" type="number" min="0" step="0.1" value="${J(r)}" data-favorite-quantity-input />
          </label>
          <div data-favorite-quantity-preview></div>
          <div class="form-actions">
            <button type="submit">${t.t(`favorites.addFoodButton`)}</button>
            <button type="button" data-module="favorites" data-action="cancelFoodPicker">${t.t(`common.cancel`)}</button>
          </div>
        </form>
      </div>
    `}return`
    <div class="favorites-wizard__section">
      <input
        type="search"
        class="favorites__search"
        data-favorite-food-search
        placeholder="${t.t(`favorites.searchFoodPlaceholder`)}"
        aria-label="${t.t(`favorites.searchFoodPlaceholder`)}"
      />
      <div class="food-card-grid food-card-grid--compact" data-favorite-food-results>
        ${Fr(r,t)}
      </div>
    </div>
    <div class="favorites-wizard__section">
      <h3>${t.t(`favorites.addedFoods`)}</h3>
      ${Ir(n.items,r,t)}
    </div>
    <div class="form-actions">
      <button type="button" data-module="favorites" data-action="goToPreview" ${n.items.length===0?`disabled`:``}>${t.t(`favorites.continueToPreview`)}</button>
    </div>
  `}function Pr(e,t){let{draft:n,foods:r,totals:i}=e;return`
    <div class="favorites-wizard__section">
      <p class="favorites-preview__name">${y(n.name)}</p>
      <span class="favorite-card__category">${y(X(n.category,t))}</span>
    </div>
    <div class="favorites-wizard__section">
      ${Ir(n.items,r,t)}
    </div>
    ${Lr(i,t)}
    <div class="form-actions">
      <button type="button" data-module="favorites" data-action="saveFavorite">${t.t(`favorites.saveFavorite`)}</button>
    </div>
  `}function Fr(e,t){return e.length===0?K(t.t(`foodLibrary.noResults`)):e.map(e=>`
        <article class="food-card food-card--compact" data-module="favorites" data-action="openFoodPicker" data-id="${e.id}" role="button" tabindex="0">
          <div class="food-card__header">
            <h3>${y(Vr(e,t))}</h3>
            <span class="food-card__category">${y(t.t(`foodLibrary.category.${e.category}`))}</span>
          </div>
          <p class="food-card__serving">${t.formatNumber(e.servingSize)} ${y(Br(e.servingUnit,t))}</p>
        </article>
      `).join(``)}function Ir(e,t,n){return!e||e.length===0?K(n.t(`favorites.noFoodsAddedYet`)):`
    <div class="favorites-item-list">
      ${e.map((e,r)=>{let i=ln(t,e);return`
            <div class="favorites-item-row">
              <div>
                <strong>${y(i?Vr(i,n):n.t(`common.noRecord`))}</strong>
                <span>${n.formatNumber(e.quantity)} ${y(Br(e.servingUnit,n))}</span>
              </div>
              <div class="favorites-item-row__actions">
                <button type="button" data-module="favorites" data-action="openFoodPicker" data-id="${i?.id??``}" data-index="${r}">${n.t(`common.edit`)}</button>
                <button type="button" data-module="favorites" data-action="removeItem" data-index="${r}">${n.t(`common.delete`)}</button>
              </div>
            </div>
          `}).join(``)}
    </div>
  `}function Lr(e,t){return`
    <div class="food-preview-card">
      <dl class="food-preview-grid">
        <div><dt>${t.t(`settings.calories`)}</dt><dd>${t.formatNumber(e.calories)} kcal</dd></div>
        <div><dt>${t.t(`settings.protein`)}</dt><dd>${t.formatNumber(e.protein)} g</dd></div>
        <div><dt>${t.t(`settings.carbohydrates`)}</dt><dd>${t.formatNumber(e.carbs)} g</dd></div>
        <div><dt>${t.t(`settings.fat`)}</dt><dd>${t.formatNumber(e.fat)} g</dd></div>
        <div><dt>${t.t(`settings.fiber`)}</dt><dd>${t.formatNumber(e.fiber)} g</dd></div>
      </dl>
    </div>
  `}function Rr(e,t){return e?`
    <button type="button" class="bottom-sheet-overlay" data-module="favorites" data-action="closeDialog" aria-label="${t.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${t.t(`favorites.deleteConfirmTitle`)}">
      <div class="bottom-sheet__header">
        <h2>${t.t(`favorites.deleteConfirmTitle`)}</h2>
        <button type="button" class="bottom-sheet__close" data-module="favorites" data-action="closeDialog" aria-label="${t.t(`common.close`)}">×</button>
      </div>
      <p>${y(t.t(`favorites.deleteConfirmMessage`,{name:e.name}))}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="favorites" data-action="confirmDelete" data-id="${e.id}">${t.t(`common.delete`)}</button>
        <button type="button" data-module="favorites" data-action="closeDialog">${t.t(`common.cancel`)}</button>
      </div>
    </div>
  `:``}function zr(e,t,n){let r=wr(t);return(r.includes(e)?r:[...r,e]).map(t=>`<option value="${t}" ${b(e,t)}>${X(t,n)}</option>`).join(``)}function Br(e,t){return e===`g`||e===`mL`?e:t.t(`foodLibrary.unit.${e}`)}function Vr(e,t){return e.isBuiltIn&&e.foodCode&&(e.name===I(e.foodCode,`en`)||e.name===I(e.foodCode,`pt-BR`))?I(e.foodCode,t.language)??e.name:e.name}function Hr(e,t,n,r){let i=e?.querySelector(`[data-favorite-search]`),a=e?.querySelector(`[data-favorite-category-filter]`),o=e?.querySelector(`[data-favorite-list]`);if(!i||!o)return;let s=()=>{let e=i.value.trim().toLowerCase(),s=a?.value??`all`,c=t.filter(t=>{let n=s===`all`||t.category===s,i=X(t.category,r).toLowerCase(),a=t.name.toLowerCase(),o=!e||a.includes(e)||i.includes(e);return n&&o});o.innerHTML=kr(c,n,r)};i.addEventListener(`input`,s),a?.addEventListener(`change`,s)}function Ur(e,t,n){let r=e?.querySelector(`[data-favorite-food-search]`),i=e?.querySelector(`[data-favorite-food-results]`);!r||!i||r.addEventListener(`input`,()=>{let e=r.value.trim().toLowerCase(),a=t.filter(t=>{let r=n.t(`foodLibrary.category.${t.category}`).toLowerCase(),i=Vr(t,n).toLowerCase();return!e||i.includes(e)||r.includes(e)});i.innerHTML=Fr(a,n)})}function Wr(e,t,n,r){let i=e?.querySelector(`[data-favorite-quantity-input]`),a=e?.querySelector(`[data-favorite-quantity-preview]`);if(!i||!a)return;let o=()=>{let e=Number(i.value)||0,n=t.servingSize>0?e/t.servingSize:0;a.innerHTML=Lr({calories:t.calories*n,protein:t.protein*n,carbs:t.carbs*n,fat:t.fat*n,fiber:t.fiber*n},r)};i.addEventListener(`input`,o),o()}function Gr(e){let t=e.app.i18n,n=e.foods??[],r=n.length===0;return`
    <section class="module-screen" aria-labelledby="food-library-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${t.t(`route.foodLibrary`)}</p>
        <h1 id="food-library-title">${t.t(`route.foodLibrary`)}</h1>
        <p>${t.t(`foodLibrary.description`)}</p>
      </div>

      ${r?qr(t):Jr(n,e.message,t)}

      ${e.activeDialog===`form`?Zr(e,t):``}
      ${e.activeDialog===`quantity`&&e.selectedFood?Qr(e.selectedFood,t):``}
      ${e.activeDialog===`delete-confirm`&&e.selectedFood?$r(e.selectedFood,t):``}
    </section>
  `}function Kr(e,t){let n=t.app.i18n;ii(e,t.foods??[],n),t.activeDialog===`quantity`&&t.selectedFood&&ai(e,t.selectedFood,n)}function qr(e){return`
    <section class="content-panel food-library-empty">
      <span class="food-library-empty__icon" aria-hidden="true">📚</span>
      <h2>${e.t(`foodLibrary.emptyTitle`)}</h2>
      <p>${e.t(`foodLibrary.emptyHint`)}</p>
      <button type="button" data-module="food-library" data-action="openAdd">${e.t(`foodLibrary.addFood`)}</button>
    </section>
  `}function Jr(e,t,n){return`
    <section class="content-panel">
      ${W(t,`success`,n)}
      <div class="food-library__toolbar">
        <input
          type="search"
          class="food-library__search"
          data-food-search
          placeholder="${n.t(`foodLibrary.searchPlaceholder`)}"
          aria-label="${n.t(`foodLibrary.searchPlaceholder`)}"
        />
        <select class="food-library__category-filter" data-food-category-filter aria-label="${n.t(`foodLibrary.category`)}">
          <option value="all">${n.t(`foodLibrary.allCategories`)}</option>
          ${Nt.map(e=>`<option value="${e}">${n.t(`foodLibrary.category.${e}`)}</option>`).join(``)}
        </select>
        <button type="button" data-module="food-library" data-action="openAdd">${n.t(`foodLibrary.addFood`)}</button>
      </div>
      <div class="food-card-grid" data-food-list>
        ${Yr(e,n)}
      </div>
    </section>
  `}function Yr(e,t){return e.length===0?K(t.t(`foodLibrary.noResults`)):e.map(e=>Xr(e,t)).join(``)}function Xr(e,t){return`
    <article class="food-card" data-module="food-library" data-action="openQuantity" data-id="${e.id}" role="button" tabindex="0">
      <div class="food-card__header">
        <h3>${y(Z(e,t))}</h3>
        <span class="food-card__category">${y(t.t(`foodLibrary.category.${e.category}`))}</span>
      </div>
      <p class="food-card__serving">${t.formatNumber(e.servingSize)} ${y(ni(e.servingUnit,t))}</p>
      <div class="food-card__macros">
        <span>${t.formatNumber(e.calories)} kcal</span>
        <span>${t.formatNumber(e.protein)} g ${t.t(`settings.protein`).toLowerCase()}</span>
      </div>
      <div class="food-card__actions">
        <button type="button" data-module="food-library" data-action="openEdit" data-id="${e.id}">${t.t(`common.edit`)}</button>
        <button type="button" data-module="food-library" data-action="openDeleteConfirm" data-id="${e.id}">${t.t(`common.delete`)}</button>
      </div>
    </article>
  `}function Zr(e,t){let n=e.editingFood??{},r=!!e.editingFood;return`
    <button type="button" class="bottom-sheet-overlay" data-module="food-library" data-action="closeDialog" aria-label="${t.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${t.t(r?`foodLibrary.editFood`:`foodLibrary.addFood`)}">
      <div class="bottom-sheet__header">
        <h2>${t.t(r?`foodLibrary.editFood`:`foodLibrary.addFood`)}</h2>
        <button type="button" class="bottom-sheet__close" data-module="food-library" data-action="closeDialog" aria-label="${t.t(`common.close`)}">×</button>
      </div>
      <form class="module-form" data-module="food-library" data-action="save">
        <label class="module-form__wide">
          <span>${t.t(`foodLibrary.foodName`)}</span>
          <input name="name" value="${q(r?Z(n,t):n.name)}" />
          ${G(e.errors,`name`,t)}
        </label>
        <label>
          <span>${t.t(`foodLibrary.category`)}</span>
          <select name="category">${ei(n.category??`others`,t)}</select>
        </label>
        <label>
          <span>${t.t(`foodLibrary.servingSize`)}</span>
          <input name="servingSize" type="number" min="0" step="0.1" value="${J(n.servingSize??100)}" />
          ${G(e.errors,`servingSize`,t)}
        </label>
        <label>
          <span>${t.t(`foodLibrary.servingUnit`)}</span>
          <select name="servingUnit">${ti(n.servingUnit??`g`,t)}</select>
        </label>
        <label>
          <span>${t.t(`settings.calories`)}</span>
          <input name="calories" type="number" min="0" step="0.1" value="${J(n.calories??0)}" />
        </label>
        <label>
          <span>${t.t(`settings.protein`)}</span>
          <input name="protein" type="number" min="0" step="0.1" value="${J(n.protein??0)}" />
        </label>
        <label>
          <span>${t.t(`settings.carbohydrates`)}</span>
          <input name="carbs" type="number" min="0" step="0.1" value="${J(n.carbs??0)}" />
        </label>
        <label>
          <span>${t.t(`settings.fat`)}</span>
          <input name="fat" type="number" min="0" step="0.1" value="${J(n.fat??0)}" />
        </label>
        <label>
          <span>${t.t(`settings.fiber`)}</span>
          <input name="fiber" type="number" min="0" step="0.1" value="${J(n.fiber??0)}" />
        </label>
        <div class="form-actions">
          <button type="submit">${t.t(`common.save`)}</button>
          <button type="button" data-module="food-library" data-action="closeDialog">${t.t(`common.cancel`)}</button>
        </div>
      </form>
    </div>
  `}function Qr(e,t){let n=ni(e.servingUnit,t);return`
    <button type="button" class="bottom-sheet-overlay" data-module="food-library" data-action="closeDialog" aria-label="${t.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${t.t(`foodLibrary.chooseQuantity`)}">
      <div class="bottom-sheet__header">
        <h2>${y(Z(e,t))}</h2>
        <button type="button" class="bottom-sheet__close" data-module="food-library" data-action="closeDialog" aria-label="${t.t(`common.close`)}">×</button>
      </div>
      <p class="bottom-sheet__subtitle">${t.t(`foodLibrary.chooseQuantity`)}</p>
      <form class="module-form module-form--single" data-module="food-library" data-action="addToMeal">
        <input type="hidden" name="foodId" value="${e.id}" />
        <label>
          <span>${t.t(`foodLibrary.quantity`)} (${y(n)})</span>
          <input name="quantity" type="number" min="0" step="0.1" value="${e.servingSize}" data-quantity-input />
        </label>
        <div data-quantity-preview></div>
        <div class="form-actions">
          <button type="submit">${t.t(`foodLibrary.addToMeal`)}</button>
          <button type="button" data-module="food-library" data-action="closeDialog">${t.t(`common.cancel`)}</button>
        </div>
      </form>
    </div>
  `}function $r(e,t){return`
    <button type="button" class="bottom-sheet-overlay" data-module="food-library" data-action="closeDialog" aria-label="${t.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${t.t(`foodLibrary.deleteConfirmTitle`)}">
      <div class="bottom-sheet__header">
        <h2>${t.t(`foodLibrary.deleteConfirmTitle`)}</h2>
        <button type="button" class="bottom-sheet__close" data-module="food-library" data-action="closeDialog" aria-label="${t.t(`common.close`)}">×</button>
      </div>
      <p>${y(t.t(`foodLibrary.deleteConfirmMessage`,{name:Z(e,t)}))}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="food-library" data-action="confirmDelete" data-id="${e.id}">${t.t(`common.delete`)}</button>
        <button type="button" data-module="food-library" data-action="closeDialog">${t.t(`common.cancel`)}</button>
      </div>
    </div>
  `}function ei(e,t){return Nt.map(n=>`<option value="${n}" ${b(e,n)}>${t.t(`foodLibrary.category.${n}`)}</option>`).join(``)}function ti(e,t){return Pt.map(n=>`<option value="${n}" ${b(e,n)}>${ni(n,t)}</option>`).join(``)}function ni(e,t){return e===`g`||e===`mL`?e:t.t(`foodLibrary.unit.${e}`)}function Z(e,t){return e.isBuiltIn&&e.foodCode&&(e.name===I(e.foodCode,`en`)||e.name===I(e.foodCode,`pt-BR`))?I(e.foodCode,t.language)??e.name:e.name}function ri(e,t){return`
    <div class="food-preview-card">
      <dl class="food-preview-grid">
        <div><dt>${t.t(`settings.calories`)}</dt><dd>${t.formatNumber(e.calories)} kcal</dd></div>
        <div><dt>${t.t(`settings.protein`)}</dt><dd>${t.formatNumber(e.protein)} g</dd></div>
        <div><dt>${t.t(`settings.carbohydrates`)}</dt><dd>${t.formatNumber(e.carbs)} g</dd></div>
        <div><dt>${t.t(`settings.fat`)}</dt><dd>${t.formatNumber(e.fat)} g</dd></div>
        <div><dt>${t.t(`settings.fiber`)}</dt><dd>${t.formatNumber(e.fiber)} g</dd></div>
      </dl>
    </div>
  `}function ii(e,t,n){let r=e?.querySelector(`[data-food-search]`),i=e?.querySelector(`[data-food-category-filter]`),a=e?.querySelector(`[data-food-list]`);if(!r||!a)return;let o=()=>{let e=r.value.trim().toLowerCase(),o=i?.value??`all`,s=t.filter(t=>{let r=o===`all`||t.category===o,i=n.t(`foodLibrary.category.${t.category}`).toLowerCase(),a=Z(t,n).toLowerCase(),s=!e||a.includes(e)||i.includes(e);return r&&s});a.innerHTML=Yr(s,n)};r.addEventListener(`input`,o),i?.addEventListener(`change`,o)}function ai(e,t,n){let r=e?.querySelector(`[data-quantity-input]`),i=e?.querySelector(`[data-quantity-preview]`);if(!r||!i)return;let a=()=>{let e=Number(r.value)||0,a=t.servingSize>0?e/t.servingSize:0;i.innerHTML=ri({calories:t.calories*a,protein:t.protein*a,carbs:t.carbs*a,fat:t.fat*a,fiber:t.fiber*a},n)};r.addEventListener(`input`,a),a()}function oi(e){let t=e.editingRecord??{},n=e.app.i18n,r=Fe(e.app.settings??{}),i=t.mealType&&!r.includes(t.mealType)?[...r,t.mealType]:r;return`
    <section class="module-screen" aria-labelledby="meal-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${n.t(`route.mealJournal`)}</p>
        <h1 id="meal-title">${n.t(`route.mealJournal`)}</h1>
        <p>${n.t(`meal.description`)}</p>
      </div>

      <section class="content-panel">
        <h2>${e.editingRecord?n.t(`meal.edit`):n.t(`meal.add`)}</h2>
        ${W(e.message,`success`,n)}
        <form class="module-form" data-module="meal-journal" data-action="save">
          <label>
            <span>${n.t(`common.date`)}</span>
            <input name="mealDate" type="date" value="${q(t.mealDate??D())}" />
            ${G(e.errors,`mealDate`,n)}
          </label>
          <label>
            <span>${n.t(`meal.type`)}</span>
            <select name="mealType">
              ${i.map(e=>`<option value="${e}" ${b(t.mealType??i[0],e)}>${n.t(A(e))}</option>`).join(``)}
            </select>
          </label>
          <label class="module-form__wide">
            <span>${n.t(`meal.name`)}</span>
            <input name="title" value="${q(t.title)}" placeholder="${n.t(`meal.placeholder`)}" />
            ${G(e.errors,`title`,n)}
          </label>
          <label class="module-form__wide">
            <span>${n.t(`common.notes`)}</span>
            <textarea name="notes" rows="3" placeholder="${n.t(`meal.optionalNotes`)}">${q(t.notes)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${e.editingRecord?n.t(`common.saveChanges`):n.t(`meal.addButton`)}</button>
            ${e.editingRecord?`<button type="button" data-action="cancel">${n.t(`common.cancel`)}</button>`:``}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${n.t(`meal.listTitle`)}</h2>
        ${si(e.records,n)}
      </section>
    </section>
  `}function si(e,t){return e.length===0?K(t.t(`meal.empty`)):`
    <div class="record-list">
      ${e.map(e=>`
            <article class="record-card">
              <div>
                <span class="record-card__meta">${y(t.formatDate(e.mealDate))} &middot; ${y(t.t(A(e.mealType)))}</span>
                <h3>${y(e.title)}</h3>
                ${e.calories==null?``:`<p class="record-card__nutrition">${y(t.formatNumber(e.calories))} kcal &middot; ${y(t.formatNumber(e.protein??0))} g ${t.t(`settings.protein`).toLowerCase()}</p>`}
                <p>${e.notes?y(e.notes):t.t(`common.noNotes`)}</p>
              </div>
              <div class="record-card__actions">
                <button type="button" data-action="edit" data-id="${e.id}">${t.t(`common.edit`)}</button>
                <button type="button" data-action="delete" data-id="${e.id}">${t.t(`common.delete`)}</button>
              </div>
            </article>
          `).join(``)}
    </div>
  `}var ci=[`details`,`meals`,`preview`];function li(e){let t=e.app.i18n,n=e.mealPlans??[],r=e.favoriteMeals??[],i=e.foods??[],a=n.length===0;return`
    <section class="module-screen" aria-labelledby="meal-plans-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${t.t(`route.mealPlans`)}</p>
        <h1 id="meal-plans-title">${t.t(`route.mealPlans`)}</h1>
        <p>${t.t(`mealPlans.description`)}</p>
      </div>

      ${a?di(t):fi(n,r,i,e.message,t)}

      ${e.activeDialog===`wizard`&&e.draft?hi(e,e.app.settings??{},t):``}
      ${e.activeDialog===`delete-confirm`?Si(n.find(t=>t.id===e.selectedPlanId),t):``}
    </section>
  `}function ui(e,t){let n=t.app.i18n,r=t.favoriteMeals??[],i=t.foods??[];Ci(e,t.mealPlans??[],r,i,n),t.activeDialog===`wizard`&&t.wizardStep===`meals`&&!t.pickingFavoriteMeal&&wi(e,r,i,n)}function di(e){return`
    <section class="content-panel meal-plans-empty">
      <span class="meal-plans-empty__icon" aria-hidden="true">🍽</span>
      <h2>${e.t(`mealPlans.emptyTitle`)}</h2>
      <p>${e.t(`mealPlans.emptyHint`)}</p>
      <button type="button" data-module="meal-plans" data-action="openCreate">${e.t(`mealPlans.createButton`)}</button>
    </section>
  `}function fi(e,t,n,r,i){return`
    <section class="content-panel">
      ${W(r,`success`,i)}
      <div class="favorites__toolbar">
        <input
          type="search"
          class="favorites__search"
          data-mealplan-search
          placeholder="${i.t(`mealPlans.searchPlaceholder`)}"
          aria-label="${i.t(`mealPlans.searchPlaceholder`)}"
        />
        <button type="button" data-module="meal-plans" data-action="openCreate">${i.t(`mealPlans.createButton`)}</button>
      </div>
      <div class="favorite-card-grid" data-mealplan-list>
        ${pi(e,t,n,i)}
      </div>
    </section>
  `}function pi(e,t,n,r){return e.length===0?K(r.t(`mealPlans.noResults`)):e.map(e=>mi(e,t,n,r)).join(``)}function mi(e,t,n,r){let i=Dn(e,t,n);return`
    <article class="favorite-card" data-module="meal-plans" data-action="register" data-id="${e.id}" role="button" tabindex="0">
      <div class="favorite-card__header">
        <h3>${y(e.name)}</h3>
      </div>
      <p class="favorite-card__meta">${r.t(`mealPlans.mealsCount`,{count:e.meals.length})}</p>
      <div class="favorite-card__macros">
        <span>${r.formatNumber(i.calories)} kcal</span>
        <span>${r.formatNumber(i.protein)} g ${r.t(`settings.protein`).toLowerCase()}</span>
      </div>
      <div class="favorite-card__actions">
        <button type="button" data-module="meal-plans" data-action="openEdit" data-id="${e.id}">${r.t(`common.edit`)}</button>
        <button type="button" data-module="meal-plans" data-action="openDeleteConfirm" data-id="${e.id}">${r.t(`common.delete`)}</button>
      </div>
    </article>
  `}function hi(e,t,n){let{draft:r,wizardMode:i,wizardStep:a}=e,o=n.t(i===`edit`?`mealPlans.editPlan`:`mealPlans.createPlan`),s=ci.indexOf(a);return`
    <button type="button" class="bottom-sheet-overlay" data-module="meal-plans" data-action="closeWizard" aria-label="${n.t(`common.close`)}"></button>
    <div class="bottom-sheet favorites-wizard" role="dialog" aria-modal="true" aria-label="${o}">
      <div class="bottom-sheet__header">
        ${a===`details`?``:`<button type="button" class="bottom-sheet__back" data-module="meal-plans" data-action="wizardBack" aria-label="${n.t(`common.back`)}">←</button>`}
        <h2>${o}</h2>
        <button type="button" class="bottom-sheet__close" data-module="meal-plans" data-action="closeWizard" aria-label="${n.t(`common.close`)}">×</button>
      </div>
      <div class="favorites-wizard__steps" aria-hidden="true">
        ${ci.map((e,t)=>`<span class="favorites-wizard__step${t<=s?` is-active`:``}"></span>`).join(``)}
      </div>
      ${a===`details`?gi(r,e.errors,n):a===`meals`?_i(e,t,n):vi(e,n)}
    </div>
  `}function gi(e,t,n){return`
    <form class="module-form" data-module="meal-plans" data-action="saveDetails">
      <label class="module-form__wide">
        <span>${n.t(`mealPlans.planName`)}</span>
        <input name="name" value="${q(e.name)}" placeholder="${n.t(`mealPlans.namePlaceholder`)}" />
        ${G(t,`name`,n)}
      </label>
      <label class="module-form__wide">
        <span>${n.t(`mealPlans.planDescription`)}</span>
        <textarea name="description" rows="3" placeholder="${n.t(`mealPlans.descriptionPlaceholder`)}">${q(e.description)}</textarea>
      </label>
      <div class="form-actions">
        <button type="submit">${n.t(`favorites.nextButton`)}</button>
        <button type="button" data-module="meal-plans" data-action="closeWizard">${n.t(`common.cancel`)}</button>
      </div>
    </form>
  `}function _i(e,t,n){let{draft:r,favoriteMeals:i,foods:a,pickingFavoriteMeal:o,editingMealIndex:s}=e;if(o){let e=s===null?null:r.meals[s],i=Fe(t),c=e?.mealSlot&&!i.includes(e.mealSlot)?[...i,e.mealSlot]:i,l=z(o,a);return`
      <div class="favorites-wizard__section">
        <h3>${y(o.name)}</h3>
        <p class="bottom-sheet__subtitle">${n.formatNumber(l.calories)} kcal &middot; ${n.formatNumber(l.protein)} g ${n.t(`settings.protein`).toLowerCase()}</p>
        <form class="module-form module-form--single" data-module="meal-plans" data-action="addMeal">
          <input type="hidden" name="favoriteMealId" value="${o.id}" />
          ${s===null?``:`<input type="hidden" name="index" value="${s}" />`}
          <label>
            <span>${n.t(`mealPlans.assignSlot`)}</span>
            <select name="mealSlot">
              ${c.map(t=>`<option value="${t}" ${b(e?.mealSlot,t)}>${n.t(A(t))}</option>`).join(``)}
            </select>
          </label>
          <div class="form-actions">
            <button type="submit">${n.t(`mealPlans.addToPlanButton`)}</button>
            <button type="button" data-module="meal-plans" data-action="cancelFavoritePicker">${n.t(`common.cancel`)}</button>
          </div>
        </form>
      </div>
    `}return`
    <div class="favorites-wizard__section">
      <input
        type="search"
        class="favorites__search"
        data-mealplan-favorite-search
        placeholder="${n.t(`mealPlans.searchFavoritesPlaceholder`)}"
        aria-label="${n.t(`mealPlans.searchFavoritesPlaceholder`)}"
      />
      <div class="food-card-grid food-card-grid--compact" data-mealplan-favorite-results>
        ${yi(i,a,n)}
      </div>
    </div>
    <div class="favorites-wizard__section">
      <h3>${n.t(`mealPlans.addedMeals`)}</h3>
      ${bi(r.meals,i,n)}
    </div>
    <div class="form-actions">
      <button type="button" data-module="meal-plans" data-action="goToPreview" ${r.meals.length===0?`disabled`:``}>${n.t(`favorites.continueToPreview`)}</button>
    </div>
  `}function vi(e,t){let{draft:n,favoriteMeals:r,totals:i}=e;return`
    <div class="favorites-wizard__section">
      <p class="favorites-preview__name">${y(n.name)}</p>
      ${n.description?`<p>${y(n.description)}</p>`:``}
    </div>
    <div class="favorites-wizard__section">
      ${bi(n.meals,r,t)}
    </div>
    ${xi(i,t)}
    <div class="form-actions">
      <button type="button" data-module="meal-plans" data-action="saveMealPlan">${t.t(`mealPlans.savePlanButton`)}</button>
    </div>
  `}function yi(e,t,n){return e.length===0?K(n.t(`favorites.noResults`)):e.map(e=>{let r=z(e,t);return`
        <article class="food-card food-card--compact" data-module="meal-plans" data-action="openFavoritePicker" data-id="${e.id}" role="button" tabindex="0">
          <div class="food-card__header">
            <h3>${y(e.name)}</h3>
          </div>
          <p class="food-card__serving">${n.formatNumber(r.calories)} kcal</p>
        </article>
      `}).join(``)}function bi(e,t,n){return!e||e.length===0?K(n.t(`mealPlans.noMealsAddedYet`)):`
    <div class="favorites-item-list">
      ${e.map((e,r)=>{let i=En(t,e);return`
            <div class="favorites-item-row">
              <div>
                <strong>${y(i?i.name:n.t(`common.noRecord`))}</strong>
                <span>${y(n.t(A(e.mealSlot)))}</span>
              </div>
              <div class="favorites-item-row__actions">
                <button type="button" data-module="meal-plans" data-action="openFavoritePicker" data-id="${i?.id??``}" data-index="${r}">${n.t(`common.edit`)}</button>
                <button type="button" data-module="meal-plans" data-action="removeMeal" data-index="${r}">${n.t(`common.delete`)}</button>
              </div>
            </div>
          `}).join(``)}
    </div>
  `}function xi(e,t){return`
    <div class="food-preview-card">
      <dl class="food-preview-grid">
        <div><dt>${t.t(`settings.calories`)}</dt><dd>${t.formatNumber(e.calories)} kcal</dd></div>
        <div><dt>${t.t(`settings.protein`)}</dt><dd>${t.formatNumber(e.protein)} g</dd></div>
        <div><dt>${t.t(`settings.carbohydrates`)}</dt><dd>${t.formatNumber(e.carbs)} g</dd></div>
        <div><dt>${t.t(`settings.fat`)}</dt><dd>${t.formatNumber(e.fat)} g</dd></div>
        <div><dt>${t.t(`settings.fiber`)}</dt><dd>${t.formatNumber(e.fiber)} g</dd></div>
      </dl>
    </div>
  `}function Si(e,t){return e?`
    <button type="button" class="bottom-sheet-overlay" data-module="meal-plans" data-action="closeDialog" aria-label="${t.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${t.t(`mealPlans.deleteConfirmTitle`)}">
      <div class="bottom-sheet__header">
        <h2>${t.t(`mealPlans.deleteConfirmTitle`)}</h2>
        <button type="button" class="bottom-sheet__close" data-module="meal-plans" data-action="closeDialog" aria-label="${t.t(`common.close`)}">×</button>
      </div>
      <p>${y(t.t(`mealPlans.deleteConfirmMessage`,{name:e.name}))}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="meal-plans" data-action="confirmDelete" data-id="${e.id}">${t.t(`common.delete`)}</button>
        <button type="button" data-module="meal-plans" data-action="closeDialog">${t.t(`common.cancel`)}</button>
      </div>
    </div>
  `:``}function Ci(e,t,n,r,i){let a=e?.querySelector(`[data-mealplan-search]`),o=e?.querySelector(`[data-mealplan-list]`);!a||!o||a.addEventListener(`input`,()=>{let e=a.value.trim().toLowerCase(),s=t.filter(t=>!e||t.name.toLowerCase().includes(e));o.innerHTML=pi(s,n,r,i)})}function wi(e,t,n,r){let i=e?.querySelector(`[data-mealplan-favorite-search]`),a=e?.querySelector(`[data-mealplan-favorite-results]`);!i||!a||i.addEventListener(`input`,()=>{let e=i.value.trim().toLowerCase(),o=t.filter(t=>!e||t.name.toLowerCase().includes(e));a.innerHTML=yi(o,n,r)})}function Ti(e){let t=e.editingRecord??{},n=e.app.i18n,r=e.app.settings?.medication??{},i=r.doseUnit||`mg`,a=r.name||n.t(`route.medication`);return`
    <section class="module-screen" aria-labelledby="medication-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${n.t(`route.medication`)}</p>
        <h1 id="medication-title">${y(a)}</h1>
        <p>${n.t(`medication.description`)}</p>
      </div>

      <section class="content-panel">
        <h2>${e.editingRecord?n.t(`medication.edit`):n.t(`medication.add`)}</h2>
        ${W(e.message,`success`,n)}
        <form class="module-form" data-module="medication" data-action="save">
          <label>
            <span>${n.t(`common.date`)}</span>
            <input name="administeredAt" type="date" value="${q(t.administeredAt??D())}" />
            ${G(e.errors,`administeredAt`,n)}
          </label>
          <label>
            <span>${n.t(`medication.doseAmount`)} (${y(i)})</span>
            <input name="doseMg" type="number" min="0" step="0.1" value="${J(t.doseMg)}" />
            ${G(e.errors,`doseMg`,n)}
          </label>
          <label>
            <span>${n.t(`medication.site`)}</span>
            <select name="site">
              <option value="not-specified" ${b(t.site??`not-specified`,`not-specified`)}>${n.t(`medication.notSpecified`)}</option>
              <option value="abdomen" ${b(t.site,`abdomen`)}>${n.t(`medication.abdomen`)}</option>
              <option value="thigh" ${b(t.site,`thigh`)}>${n.t(`medication.thigh`)}</option>
              <option value="upper-arm" ${b(t.site,`upper-arm`)}>${n.t(`medication.upperArm`)}</option>
            </select>
          </label>
          <label class="module-form__wide">
            <span>${n.t(`common.notes`)}</span>
            <textarea name="notes" rows="3">${q(t.notes)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${e.editingRecord?n.t(`common.saveChanges`):n.t(`medication.addButton`)}</button>
            ${e.editingRecord?`<button type="button" data-action="cancel">${n.t(`common.cancel`)}</button>`:``}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${n.t(`medication.listTitle`)}</h2>
        ${Ei(e.records,r,n)}
      </section>
    </section>
  `}function Ei(e,t,n){if(e.length===0)return K(n.t(`medication.empty`));let r=t.doseUnit||`mg`,i=t.name?`${y(t.name)} &middot; `:``;return`
    <div class="record-list">
      ${e.map(e=>`
            <article class="record-card">
              <div>
                <span class="record-card__meta">${y(n.formatDate(e.administeredAt))} &middot; ${y(Di(e.site,n))}</span>
                <h3>${i}${y(n.formatNumber(e.doseMg))} ${y(r)}</h3>
                <p>${e.notes?y(e.notes):n.t(`common.noNotes`)}</p>
              </div>
              <div class="record-card__actions">
                <button type="button" data-action="edit" data-id="${e.id}">${n.t(`common.edit`)}</button>
                <button type="button" data-action="delete" data-id="${e.id}">${n.t(`common.delete`)}</button>
              </div>
            </article>
          `).join(``)}
    </div>
  `}function Di(e,t){return t.t({abdomen:`medication.abdomen`,thigh:`medication.thigh`,"upper-arm":`medication.upperArm`,"not-specified":`medication.notSpecified`}[e]??`medication.notSpecified`)}var Oi=[{value:``,labelKey:`settings.sexNotSet`},{value:`female`,labelKey:`settings.sexFemale`},{value:`male`,labelKey:`settings.sexMale`},{value:`other`,labelKey:`settings.sexOther`}],ki=[{value:`lose-weight`,labelKey:`settings.goalLoseWeight`},{value:`maintain-weight`,labelKey:`settings.goalMaintainWeight`},{value:`gain-muscle`,labelKey:`settings.goalGainMuscle`}],Ai=[{value:`sedentary`,labelKey:`settings.activitySedentary`},{value:`light`,labelKey:`settings.activityLight`},{value:`moderate`,labelKey:`settings.activityModerate`},{value:`intense`,labelKey:`settings.activityIntense`}],ji=[`monday`,`tuesday`,`wednesday`,`thursday`,`friday`,`saturday`,`sunday`].map(e=>({value:e,labelKey:`day.${e}`})),Mi=Nn.map(e=>({value:e,labelKey:`settings.administration.${e}`})),Ni=Pn.map(e=>({value:e,labelKey:`settings.frequency.${e}`})),Pi=Fn.map(e=>({value:e,labelKey:`settings.doseUnit.${e}`})),Fi=[{key:`calories`,labelKey:`dashboard.calories`},{key:`protein`,labelKey:`dashboard.protein`},{key:`water`,labelKey:`dashboard.water`},{key:`sleep`,labelKey:`dashboard.sleep`},{key:`steps`,labelKey:`dashboard.steps`},{key:`weight`,labelKey:`dashboard.weight`},{key:`medication`,labelKey:`dashboard.medication`},{key:`recentMeals`,labelKey:`dashboard.recentMealsCard`},{key:`recentActivity`,labelKey:`dashboard.recentActivityCard`}];function Ii(e){let t=e.settings??{},n=e.backupStatus??{},r=e.app.i18n,i=e.app.units;return`
    <section class="module-screen" aria-labelledby="settings-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${r.t(`route.settings`)}</p>
        <h1 id="settings-title">${r.t(`route.settings`)}</h1>
        <p>${r.t(`settings.description`)}</p>
      </div>

      <form class="settings-form" data-module="settings" data-action="save">
        <section class="content-panel">
          <h2>${r.t(`settings.preferences`)}</h2>
          ${W(e.message,`success`,r)}
          <div class="module-form">
            <label>
              <span>${r.t(`settings.language`)}</span>
              <select name="language">
                ${Q(_e,t.language??`en`,r)}
              </select>
            </label>
            <label>
              <span>${r.t(`settings.theme`)}</span>
              <select name="theme">
                ${Q(ve,t.theme??`system`,r)}
              </select>
            </label>
            ${Vi(i,r)}
          </div>
        </section>

        <section class="content-panel">
          <h2>${r.t(`settings.profile`)}</h2>
          <div class="form-subsection">
            <h3>${r.t(`settings.personalInfo`)}</h3>
            <div class="module-form">
              <label>
                <span>${r.t(`settings.name`)}</span>
                <input name="displayName" value="${q(t.displayName)}" />
              </label>
              <label>
                <span>${r.t(`settings.sex`)}</span>
                <select name="sex">
                  ${Q(Oi,t.sex??``,r)}
                </select>
              </label>
              <label>
                <span>${r.t(`settings.birthDate`)}</span>
                <input name="birthDate" type="date" value="${q(t.birthDate)}" />
              </label>
              <label>
                <span>${r.t(`settings.height`)} (${i.measurement})</span>
                <input name="height" type="number" min="0" step="0.1" value="${J(t.height)}" />
              </label>
            </div>
          </div>

          <div class="form-subsection">
            <h3>${r.t(`settings.goal`)}</h3>
            <div class="module-form">
              <label>
                <span>${r.t(`settings.goal`)}</span>
                <select name="healthGoal">
                  ${Q(ki,t.healthGoal??`lose-weight`,r)}
                </select>
              </label>
              <label>
                <span>${r.t(`settings.activityLevel`)}</span>
                <select name="activityLevel">
                  ${Q(Ai,t.activityLevel??`moderate`,r)}
                </select>
              </label>
            </div>
          </div>
        </section>

        <section class="content-panel">
          <h2>${r.t(`settings.dailyGoals`)}</h2>
          <div class="form-subsection">
            <h3>${r.t(`settings.weightGoals`)}</h3>
            <div class="module-form">
              ${$(`currentWeight`,`settings.currentWeight`,t.currentWeight,i.weight,r)}
              ${$(`targetWeight`,`settings.targetWeight`,t.targetWeight,i.weight,r)}
            </div>
          </div>

          <div class="form-subsection">
            <h3>${r.t(`settings.nutritionGoals`)}</h3>
            <div class="module-form">
              ${$(`calorieGoal`,`settings.calories`,t.calorieGoal,`kcal`,r)}
              ${$(`proteinGoal`,`settings.protein`,t.proteinGoal,`g`,r)}
              ${$(`carbsGoal`,`settings.carbohydrates`,t.carbsGoal,`g`,r)}
              ${$(`fatGoal`,`settings.fat`,t.fatGoal,`g`,r)}
              ${$(`fiberGoal`,`settings.fiber`,t.fiberGoal,`g`,r)}
            </div>
          </div>

          <div class="form-subsection">
            <h3>${r.t(`settings.hydration`)}</h3>
            <div class="module-form">
              ${$(`waterGoal`,`settings.dailyWaterGoal`,t.waterGoal,`mL`,r)}
            </div>
          </div>

          <div class="form-subsection">
            <h3>${r.t(`settings.sleep`)}</h3>
            <div class="module-form">
              ${$(`sleepGoal`,`settings.dailySleepGoal`,t.sleepGoal,`h`,r)}
            </div>
          </div>

          <div class="form-subsection">
            <h3>${r.t(`settings.steps`)}</h3>
            <div class="module-form">
              ${$(`stepGoal`,`settings.dailyStepGoal`,t.stepGoal,``,r)}
            </div>
          </div>

          ${zi(t.medication??{},r)}
        </section>

        <section class="content-panel">
          <h2>${r.t(`settings.dashboardPreferences`)}</h2>
          <div class="checkbox-grid">
            ${Fi.map(e=>Hi(e,t.dashboardCards,r)).join(``)}
          </div>
        </section>

        <section class="content-panel">
          <h2>${r.t(`settings.visibleMealSlots`)}</h2>
          <p>${r.t(`settings.visibleMealSlotsHint`)}</p>
          <div class="checkbox-grid">
            ${k.map(e=>Ui(e,t.mealSlots,r)).join(``)}
          </div>
          <div class="form-actions">
            <button type="submit">${r.t(`settings.save`)}</button>
            <button type="button" data-action="reset">${r.t(`common.reset`)}</button>
          </div>
        </section>
      </form>

      <section class="content-panel">
        <h2>${r.t(`settings.backupExport`)}</h2>
        ${W(n.message,`success`,r,n.messageParams)}
        ${W(n.error,`error`,r,n.errorParams)}
        <div class="form-actions">
          <button type="button" data-module="backup-restore" data-action="export">${r.t(`backup.exportJson`)}</button>
        </div>
        <textarea class="backup-textarea" readonly rows="8">${q(n.exportText)}</textarea>
      </section>

      <section class="content-panel">
        <h2>${r.t(`settings.backupImport`)}</h2>
        <form class="module-form module-form--single" data-module="backup-restore" data-action="import">
          <label class="module-form__wide">
            <span>${r.t(`backup.json`)}</span>
            <textarea name="importText" rows="8" placeholder="${r.t(`backup.placeholder`)}">${q(n.importText)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${r.t(`backup.importJson`)}</button>
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${r.t(`app.versionLabel`)}</h2>
        <p class="settings-version">${r.t(`app.name`)} &middot; ${r.t(`app.version`,{version:e.app.appVersion})}</p>
      </section>

      ${e.developer?.isEnabled?Li(e.developer,r):``}
    </section>
  `}function Li(e,t){let n=e.versions??{},r=typeof navigator<`u`&&!!navigator.serviceWorker?.controller;return`
    <section class="content-panel">
      <h2>${t.t(`developer.title`)}</h2>
      ${W(e.message,`success`,t)}
      <dl class="settings-units">
        <div>
          <dt>${t.t(`developer.appVersionLabel`)}</dt>
          <dd>${y(n.app)}</dd>
        </div>
        <div>
          <dt>${t.t(`developer.databaseVersionLabel`)}</dt>
          <dd>${y(n.database)}</dd>
        </div>
        <div>
          <dt>${t.t(`developer.catalogVersionLabel`)}</dt>
          <dd>${y(n.catalogCurrent)}</dd>
        </div>
        <div>
          <dt>${t.t(`developer.catalogVersionStoredLabel`)}</dt>
          <dd>${n.catalogStored==null?t.t(`developer.unknown`):y(n.catalogStored)}</dd>
        </div>
        <div>
          <dt>${t.t(`developer.serviceWorkerLabel`)}</dt>
          <dd>${r?t.t(`developer.serviceWorkerActive`):t.t(`developer.serviceWorkerInactive`)}</dd>
        </div>
      </dl>
      <div class="form-actions">
        <button type="button" data-module="developer" data-action="reimportCatalog">${t.t(`developer.reimportCatalog`)}</button>
        <button type="button" data-export-logs>${t.t(`developer.exportLogs`)}</button>
        <button type="button" class="button-danger" data-module="developer" data-action="requestConfirm" data-tool="clearDatabase">${t.t(`developer.clearDatabase`)}</button>
        <button type="button" class="button-danger" data-module="developer" data-action="requestConfirm" data-tool="resetFirstLaunch">${t.t(`developer.resetFirstLaunch`)}</button>
      </div>
    </section>
    ${e.confirmingAction?Ri(e.confirmingAction,t):``}
  `}function Ri(e,t){let n=e===`resetFirstLaunch`?`developer.resetFirstLaunchConfirmTitle`:`developer.clearDatabaseConfirmTitle`,r=e===`resetFirstLaunch`?`developer.resetFirstLaunchConfirmMessage`:`developer.clearDatabaseConfirmMessage`;return`
    <button type="button" class="bottom-sheet-overlay" data-module="developer" data-action="cancelConfirm" aria-label="${t.t(`common.close`)}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${t.t(n)}">
      <div class="bottom-sheet__header">
        <h2>${t.t(n)}</h2>
        <button type="button" class="bottom-sheet__close" data-module="developer" data-action="cancelConfirm" aria-label="${t.t(`common.close`)}">×</button>
      </div>
      <p>${t.t(r)}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="developer" data-action="${e}">${t.t(`common.confirm`)}</button>
        <button type="button" data-module="developer" data-action="cancelConfirm">${t.t(`common.cancel`)}</button>
      </div>
    </div>
  `}function zi(e,t){let n=e.enabled??!0;return`
    <div class="form-subsection">
      <h3>${t.t(`settings.medication`)}</h3>
      <div class="module-form">
        <label class="checkbox-control">
          <input name="medicationEnabled" type="hidden" value="off" />
          <input name="medicationEnabled" type="checkbox" ${n?`checked`:``} />
          <span>${t.t(`settings.enableMedicationTracking`)}</span>
        </label>
      </div>
      ${n?Bi(e,t):``}
    </div>
  `}function Bi(e,t){return`
    <div class="module-form">
      <label>
        <span>${t.t(`settings.medicationName`)}</span>
        <input name="medicationName" value="${q(e.name)}" />
      </label>
      <label>
        <span>${t.t(`settings.administrationType`)}</span>
        <select name="administrationType">
          ${Q(Mi,e.administrationType??`injection`,t)}
        </select>
      </label>
      <label>
        <span>${t.t(`settings.frequency`)}</span>
        <select name="frequency">
          ${Q(Ni,e.frequency??`weekly`,t)}
        </select>
      </label>
      ${$(`defaultDose`,`settings.defaultDose`,e.defaultDose,``,t)}
      <label>
        <span>${t.t(`settings.doseUnit`)}</span>
        <select name="doseUnit">
          ${Q(Pi,e.doseUnit??`mg`,t)}
        </select>
      </label>
      <label>
        <span>${t.t(`settings.applicationDay`)}</span>
        <select name="applicationDay">
          ${Q(ji,e.applicationDay??`monday`,t)}
        </select>
      </label>
      <label class="module-form__wide">
        <span>${t.t(`settings.medicationNotes`)}</span>
        <textarea name="medicationNotes" rows="3">${q(e.notes)}</textarea>
      </label>
    </div>
  `}function Q(e,t,n){return e.map(e=>`
        <option value="${e.value}" ${b(t,e.value)}>
          ${n.t(e.labelKey)}
        </option>
      `).join(``)}function Vi(e,t){return`
    <div class="module-form__wide settings-units" aria-label="${t.t(`settings.units`)}">
      <h3>${t.t(`settings.units`)} (${t.t(`common.automatic`)})</h3>
      <p>${t.t(`settings.unitsAutomatic`)}</p>
      <dl>
        <div>
          <dt>${t.t(`settings.weightUnit`)}</dt>
          <dd>${e.weight}</dd>
        </div>
        <div>
          <dt>${t.t(`settings.measurementUnit`)}</dt>
          <dd>${e.measurement}</dd>
        </div>
        <div>
          <dt>${t.t(`settings.dateFormat`)}</dt>
          <dd>${e.dateFormat}</dd>
        </div>
      </dl>
    </div>
  `}function $(e,t,n,r,i){return`
    <label>
      <span>${i.t(t)}${r?` (${y(r)})`:``}</span>
      <input name="${e}" type="number" min="0" step="0.1" value="${J(n)}" />
    </label>
  `}function Hi(e,t={},n){let r=t?.[e.key]??!0,i=`dashboardCard_${e.key}`;return`
    <label class="checkbox-control">
      <input name="${i}" type="hidden" value="off" />
      <input name="${i}" type="checkbox" ${r?`checked`:``} />
      <span>${n.t(e.labelKey)}</span>
    </label>
  `}function Ui(e,t={},n){let r=t?.[e]??!1,i=`mealSlot_${e}`;return`
    <label class="checkbox-control">
      <input name="${i}" type="hidden" value="off" />
      <input name="${i}" type="checkbox" ${r?`checked`:``} />
      <span>${n.t(`mealSlot.${e}`)}</span>
    </label>
  `}function Wi(e){let t=e.editingRecord??{},n=e.app.i18n,r=e.app.units.weight;return`
    <section class="module-screen" aria-labelledby="weight-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${n.t(`route.weightTracking`)}</p>
        <h1 id="weight-title">${n.t(`route.weightTracking`)}</h1>
        <p>${n.t(`weight.description`)}</p>
      </div>

      <section class="content-panel">
        <h2>${e.editingRecord?n.t(`weight.edit`):n.t(`weight.add`)}</h2>
        ${W(e.message,`success`,n)}
        <form class="module-form" data-module="weight-tracking" data-action="save">
          <label>
            <span>${n.t(`common.date`)}</span>
            <input name="recordedAt" type="date" value="${q(t.recordedAt??D())}" />
            ${G(e.errors,`recordedAt`,n)}
          </label>
          <label>
            <span>${n.t(`weight.weight`)}</span>
            <input name="weight" type="number" min="0" step="0.1" value="${J(t.weight)}" />
            ${G(e.errors,`weight`,n)}
          </label>
          <label>
            <span>${n.t(`common.unit`)}</span>
            <input value="${r}" readonly aria-readonly="true" />
            <input name="unit" type="hidden" value="${r}" />
          </label>
          <label class="module-form__wide">
            <span>${n.t(`common.notes`)}</span>
            <textarea name="notes" rows="3">${q(t.notes)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${e.editingRecord?n.t(`common.saveChanges`):n.t(`weight.addButton`)}</button>
            ${e.editingRecord?`<button type="button" data-action="cancel">${n.t(`common.cancel`)}</button>`:``}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${n.t(`weight.listTitle`)}</h2>
        ${Gi(e.records,n)}
      </section>
    </section>
  `}function Gi(e,t){return e.length===0?K(t.t(`weight.empty`)):`
    <div class="record-list">
      ${e.map(e=>`
            <article class="record-card">
              <div>
                <span class="record-card__meta">${y(t.formatDate(e.recordedAt))}</span>
                <h3>${y(t.formatNumber(e.weight))} ${y(e.unit)}</h3>
                <p>${e.notes?y(e.notes):t.t(`common.noNotes`)}</p>
              </div>
              <div class="record-card__actions">
                <button type="button" data-action="edit" data-id="${e.id}">${t.t(`common.edit`)}</button>
                <button type="button" data-action="delete" data-id="${e.id}">${t.t(`common.delete`)}</button>
              </div>
            </article>
          `).join(``)}
    </div>
  `}var Ki=[{id:`dashboard`,label:`Dashboard`,labelKey:`route.dashboard`,path:`/`,section:`Core`,sectionKey:`section.core`,moduleKey:`dashboard`,render:fr},{id:`meal-journal`,label:`Meal Journal`,labelKey:`route.mealJournal`,path:`/meal-journal`,section:`Tracking`,sectionKey:`section.tracking`,moduleKey:`meal-journal`,render:oi},{id:`weight-tracking`,label:`Weight Tracking`,labelKey:`route.weightTracking`,path:`/weight-tracking`,section:`Tracking`,sectionKey:`section.tracking`,moduleKey:`weight-tracking`,render:Wi},{id:`body-measurements`,label:`Body Measurements`,labelKey:`route.bodyMeasurements`,path:`/body-measurements`,section:`Tracking`,sectionKey:`section.tracking`,moduleKey:`body-measurements`,render:cr},{id:`medication`,label:`Medication`,labelKey:`route.medication`,path:`/medication`,section:`Medication`,sectionKey:`section.medication`,moduleKey:`medication`,render:Ti},{id:`favorites`,label:`Favorites`,labelKey:`route.favorites`,path:`/favorites`,section:`Tracking`,sectionKey:`section.tracking`,moduleKey:`favorites`,hidden:!0,render:Tr,afterRender:Er},{id:`meal-plans`,label:`Meal Plans`,labelKey:`route.mealPlans`,path:`/meal-plans`,section:`Tracking`,sectionKey:`section.tracking`,moduleKey:`meal-plans`,hidden:!0,render:li,afterRender:ui},{id:`food-library`,label:`Food Library`,labelKey:`route.foodLibrary`,path:`/food-library`,section:`Tracking`,sectionKey:`section.tracking`,moduleKey:`food-library`,hidden:!0,render:Gr,afterRender:Kr},{id:`settings`,label:`Settings`,labelKey:`route.settings`,path:`/settings`,section:`Support`,sectionKey:`section.support`,moduleKey:`settings`,render:Ii},{id:`backup-restore`,label:`Backup & Restore`,labelKey:`route.backupRestore`,path:`/backup-restore`,section:`Support`,sectionKey:`section.support`,moduleKey:`backup-restore`,render:sr}];function qi({root:t}){let n=new r({namespace:`HWP`}),i=new e,a=ue({logger:n}),o=tr({persistence:a,eventBus:i}),s=ar({routes:Ki,logger:n}),c=new Ae({eventBus:i,logger:n,modules:o,persistence:a,router:s,storage:a.storage});return ge({eventBus:i,getI18nContext:()=>c.getI18nContext()}),{logger:n,async start(){if(!t)throw Error(`Application root element was not found.`);await c.initialize(),Ve({root:t,viewModel:c}),s.start(),n.info(`Application shell started.`)}}}function Ji(e){if(!(`serviceWorker`in navigator))return;let t=`/Health-Weight-Pro/`;window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`${t}sw.js`,{scope:t}).catch(t=>{e?.warn(`Service worker registration failed.`,{error:t.message})})})}var Yi=qi({root:document.querySelector(`#app`)});Yi.start(),Ji(Yi.logger);
//# sourceMappingURL=index-D5zeE0-l.js.map