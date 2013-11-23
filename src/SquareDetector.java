import java.io.BufferedReader;
import java.io.FileReader;

/**
 * SquareDetector
 * User: Radovan Duga
 * Date: 11/22/13
 * Time: 3:42 PM
 */
public class SquareDetector {

    public static void main(String[] args) throws Exception {
        // states of the square recognition
        int BEFORE_FIRST_LINE = 1;
        int FIRST_LINE_INSIDE = 2;
        int FIRST_LINE_AFTER = 3;
        int INSIDE_SQUARE = 4;
        int AFTER_SQUARE = 5;
        int NO_SQUARE = 6;

        BufferedReader reader = new BufferedReader(new FileReader("SquareDetector.input"));

        int T = Integer.parseInt(reader.readLine());
//        System.out.println(T);

        for (int i = 1; i <= T; ++i) {

            int N = Integer.parseInt(reader.readLine());
//            System.out.println(N);

            // first non empty line: detect size of square
            // all next lines: check there is # only on defined places

            int left = -1, right = -1;
            int linesToReadSquare = -1; // width or height of square
//            int startLineOfSquare = -1;

            boolean firstLine = true;
            boolean wasFirstLine = false;

            int state = BEFORE_FIRST_LINE;

            // for every row
            for (int ridx = 0; ridx != N; ++ridx) {
                String line = reader.readLine();
//                System.out.println(line);
                if (state == NO_SQUARE) {
                    continue;
                }

                if (state == INSIDE_SQUARE) {
                    if (linesToReadSquare-- == 0) {
                        state = AFTER_SQUARE;
                    }
                }

                // for every column
                for (int cidx = 0; cidx != N; ++cidx) {
                    // next lines after invalid square detection
                    if (state == NO_SQUARE) {
                        continue;
                    }

                    char ch = line.charAt(cidx);
//                    System.out.print(ch);

                    if (state == BEFORE_FIRST_LINE) {
                        if (ch == '#') {
                            left = right = cidx;
                            state = FIRST_LINE_INSIDE;
//                            startLineOfSquare = ridx;
                        }
                    } else if (state == FIRST_LINE_INSIDE) {
                        if (ch == '#') {
                            right = cidx;
                        } else { // if ch == '.' {
                            state = FIRST_LINE_AFTER;
                        }
                    } else if (state == FIRST_LINE_AFTER) {
                        if (ch == '#') {
                            state = NO_SQUARE;
                        }
                    } else if (state == INSIDE_SQUARE) {
                        // ok
                        if (ch == '#') {
                            // outside has to be . char
                            if (cidx < left) {
                                state = NO_SQUARE;
                                continue;
                            } else if (cidx > right) {
                                state = NO_SQUARE;
                            }
                        } else { // if ch == '.' {
                            // inside has to be # char
                            if (cidx >= left && cidx <= right) {
                                state = NO_SQUARE;
                                continue;
                            }
                        }
                        // detect if linesToReadSquare are behind square inside it
                    } else if (state == AFTER_SQUARE) {
                        // ok
                        if (ch == '#') {
                            state = NO_SQUARE;
                            continue;
                        }
                    }
                } // end after columns

                // after columns postprocess
                if (state == FIRST_LINE_INSIDE || state == FIRST_LINE_AFTER) {
                    state = FIRST_LINE_AFTER;

                    linesToReadSquare = right - left;

                    if (linesToReadSquare > 0) {
                        state = INSIDE_SQUARE;
                    }
                }
//                System.out.println();
            } // end after rows

            if (state == FIRST_LINE_INSIDE || state == FIRST_LINE_AFTER) {
                state = FIRST_LINE_AFTER;

                if (linesToReadSquare == 0) {
                    state = INSIDE_SQUARE;
                }
            }

            // after rows postprocess
            if (state == INSIDE_SQUARE) {
                if (linesToReadSquare == 0) {
                    state = AFTER_SQUARE;
                }
            }

            boolean validSquare = state == BEFORE_FIRST_LINE || state == AFTER_SQUARE;

            System.out.println(String.format("Case #%d: %s", i, (validSquare ? "YES" : "NO")));
        }
    }
}
