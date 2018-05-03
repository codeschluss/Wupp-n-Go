import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatProgressBarModule,
	MatSidenavModule,
	MatTabsModule,
	MatToolbarModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import * as fas from '@fortawesome/free-solid-svg-icons';

import { AngularOpenlayersModule } from 'ngx-openlayers';

import { PortalRouter } from 'app/portal/portal.router';
import {
	ActivityDialogComponent
} from 'app/portal/dialogs/activity.dialog.component';
import {
	TranslationDialogComponent
} from 'app/portal/dialogs/translation.dialog.component';

import { AboutPortalComponent } from 'app/portal/about/about.portal.component';
import { MappingComponent } from 'app/portal/mapping/mapping.component';
import { PortalComponent } from 'app/portal/portal.component';
import { SearchComponent } from 'app/portal/search/search.component';
import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';
import {
	SearchFilterComponent
} from 'app/portal/search/search.filter.component';

fontawesome.add(
	fas.faAngleDown,
	fas.faAngleUp,
	fas.faBalanceScale,
	fas.faBookmark,
	fas.faCalendarAlt,
	fas.faChartPie,
	fas.faCode,
	fas.faComments,
	fas.faEnvelope,
	fas.faHome,
	fas.faInfo,
	fas.faLocationArrow,
	fas.faLock,
	fas.faMapMarkerAlt,
	fas.faPhone,
	fas.faPlus,
	fas.faSearch,
	fas.faSign,
	fas.faStar,
	fas.faTags,
	fas.faTimes,
	fas.faUser
);

@NgModule({
	declarations: [
		MappingComponent,
		PortalComponent,
		SearchComponent,
		SearchFilterComponent,

		AboutActivityComponent,
		AboutOrganisationComponent,
		AboutPortalComponent,

		ActivityDialogComponent,
		TranslationDialogComponent
	],
	entryComponents: [
		ActivityDialogComponent,
		TranslationDialogComponent
	],
	imports: [
		AngularOpenlayersModule,
		CommonModule,
		FontAwesomeModule,
		PortalRouter,

		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTabsModule,
		MatToolbarModule
	]
})

export class PortalModule { }
