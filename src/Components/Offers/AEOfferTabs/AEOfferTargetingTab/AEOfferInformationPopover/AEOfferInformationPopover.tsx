import React from "react";
import { Popover } from "react-bootstrap";

import styles from "./AEOfferInformationPopover.module.css";

export default function AEOfferInformationPopover({
  informationType,
}: {
  informationType: string;
}) {
  function selectInformation(infoType: string) {
    switch (informationType) {
      case "customDate":
        return (
          <>
            {/* <Popover.Title as="h3">Is custom value</Popover.Title> */}
            <Popover.Body>
              <p className={styles.blueText} style={{ marginBottom: 10 }}>
                Format: 1y2m3w4d5h6i7s
              </p>
              <p className={styles.grayText} style={{ marginBottom: 10 }}>
                <span className={styles.blueText}>
                  Scales must be one from:
                </span>{" "}
                y(year), m(month), w(week), d(day), h(hour), i(minute),
                s(second)
              </p>
              <p className={styles.grayText} style={{ marginBottom: 10 }}>
                <span className={styles.blueText}>For example:</span> 1y3d5i
                means lifespan of 1 year 3 days and 5 minutes
              </p>
            </Popover.Body>
          </>
        );

      default:
        return (
          <>
            <Popover.Header as="h3">Is custom value</Popover.Header>
            <Popover.Body>
              Format: 1y2m3w4d5h6i7s Scales must be one from: y(year), m(month),
              w(week), d(day), h(hour), i(minute), s(second) For example: 1y3d5i
              means lifespan of 1 year 3 days and 5 minutes
            </Popover.Body>
          </>
        );
    }
  }

  return selectInformation(informationType);
}
