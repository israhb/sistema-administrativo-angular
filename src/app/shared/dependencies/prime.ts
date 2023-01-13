// general
import { StyleClassModule } from "primeng/styleclass";
import { DialogModule } from "primeng/dialog";

// notifications
import { ToastModule } from "primeng/toast";

// buttons
import { ButtonModule } from 'primeng/button';

// prime inputs
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

// forms
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from "primeng/fileupload";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";


// prime tables 
import { MenubarModule } from "primeng/menubar";
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ListboxModule } from "primeng/listbox";
import { PasswordModule } from "primeng/password";
import { OverlayPanelModule } from "primeng/overlaypanel";

//export prime modules
export const modules: any[] = [

  // general
  StyleClassModule,
  DialogModule,
  OverlayPanelModule,

  // notifications
  ToastModule,

  // buttons
  ButtonModule,

  // inputs
  InputTextModule,
  InputNumberModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextareaModule,
  DropdownModule,
  AutoCompleteModule,
  PasswordModule,
  MultiSelectModule,

  // forms
  DividerModule,
  CalendarModule,
  FileUploadModule,
  ListboxModule,
  
  // tables
  MenubarModule,
  ContextMenuModule,
  TableModule,
  TabViewModule,
]
