import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
    className: string;
    columnClassName: string;
    monthClassName: string;
    daysGridClassName: string
    monthsMap: Map<string, { date: Date; commits: number }[]>
    dayCell: string
}

const GridCalendar = ({ monthsMap, className, columnClassName, monthClassName, daysGridClassName, dayCell }: Props) => {
    return (
        <div className={className}>
            {Array.from(monthsMap.entries()).map(([monthName, days]) => (
                <div key={monthName} className={columnClassName}>
                    <div className={monthClassName}>{monthName}</div>
                    <div className={daysGridClassName}>
                        {days.map((day, idx) => {
                            let colorClass = '';
                            if (day.commits === 0) colorClass = '';
                            else if (day.commits === 1) colorClass = 'colorLite';
                            else if (day.commits <= 5) colorClass = 'colorMedium';
                            else colorClass = 'colorDark';

                            return (
                                <div
                                    key={idx}
                                    className={`${dayCell} ${colorClass}`}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridCalendar
