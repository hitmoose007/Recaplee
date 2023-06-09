
import { Competitor } from "@/types/my-types";
export function getAverageChangesPerWebsite(competitors: Competitor[]) {
   let averageChangesPerWebsite = 0;
    competitors.forEach((competitor) => {

        if (competitor.changes_detected === undefined) return;
        averageChangesPerWebsite += competitor.changes_detected;
    });

    return averageChangesPerWebsite / competitors.length;

    }