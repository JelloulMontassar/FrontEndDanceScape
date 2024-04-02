import { Component, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate, NgbInputDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-config',
  templateUrl: './datepicker-config.component.html',
  providers: [NgbInputDatepickerConfig]
})
export class DatepickerConfigComponent {
  @Output() selectedDateChange = new EventEmitter<string>(); // Emit selected date

  model: NgbDateStruct | null = null;

  constructor(config: NgbInputDatepickerConfig, calendar: NgbCalendar) {
    // Customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2099, month: 12, day: 31 };

    // Days that don't belong to the current month are not visible
    config.outsideDays = 'hidden';

    // Weekends are disabled
    config.markDisabled = (date: NgbDateStruct) => this.isDisabled(date, calendar);

    // Setting datepicker popup to close only on click outside
    config.autoClose = 'outside';

    // Setting datepicker popup to open above the input
    config.placement = ['top-start', 'top-end'];
  }

  isDisabled(date: NgbDateStruct, calendar: NgbCalendar): boolean {
    const ngbDate: NgbDate = new NgbDate(date.year, date.month, date.day);
    return calendar.getWeekday(ngbDate) >= 6;
  }

  onDateChange(newDate: NgbDateStruct | null): void {
    if (newDate !== null) {
      // Format the selected date as a string in the format yyyy-mm-dd
      const formattedDate: string = `${newDate.year}-${this.formatNumber(newDate.month)}-${this.formatNumber(newDate.day)}`;
      this.selectedDateChange.emit(formattedDate); // Emit selected date
    }
  }

  // Helper function to format single-digit numbers with leading zero
  private formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
