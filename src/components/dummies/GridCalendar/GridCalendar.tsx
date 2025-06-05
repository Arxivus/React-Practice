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
                            if (day.commits === 0) return (<div key={idx} className={dayCell} />);
                            else if (day.commits === 1) return (<div key={idx} className={cc(dayCell, styles.colorLite)} />);
                            else if (day.commits <= 5) return (<div key={idx} className={cc(dayCell, styles.colorMedium)} />);
                            else return (<div key={idx} className={cc(dayCell, styles.colorDark)} />);
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridCalendar
