import * as moment from "moment";

export type TimeFrame = "all" | "lastMonth" | "thisMonth" | "last7Days";

export class DateRangeUtil {
  static resolveDateRange(timeFrame: TimeFrame = "lastMonth") {
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (timeFrame) {
      case "all":
        startDate = undefined;
        endDate = undefined;
        break;

      case "lastMonth":
        startDate = moment().subtract(1, "month").startOf("month").toDate();
        endDate = moment().subtract(1, "month").endOf("month").toDate();
        break;

      case "thisMonth":
        startDate = moment().startOf("month").toDate();
        endDate = moment().endOf("day").toDate();
        break;

      case "last7Days":
        startDate = moment().subtract(7, "days").startOf("day").toDate();
        endDate = moment().endOf("day").toDate();
        break;
    }

    return { startDate, endDate };
  }
}
